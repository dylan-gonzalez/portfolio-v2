"""
Automated Responsive & Mobile UI Test Suite
Tests responsiveness, viewport scaling, mobile navigation drawer,
card layouts, and interactive filtering across mobile, tablet, and desktop screens.
"""

import sys
from playwright.sync_api import sync_playwright

BASE_URL = "http://localhost:8080"
PAGES = ["/", "/projects.html", "/apps.html", "/blog.html"]

VIEWPORTS = [
    {"name": "Ultra-compact Mobile (320px)", "width": 320, "height": 568, "is_mobile": True},
    {"name": "Small Mobile (360px)", "width": 360, "height": 740, "is_mobile": True},
    {"name": "iPhone SE (375px)", "width": 375, "height": 667, "is_mobile": True},
    {"name": "iPhone 14/15/16 (390px)", "width": 390, "height": 844, "is_mobile": True},
    {"name": "Tablet / iPad (768px)", "width": 768, "height": 1024, "is_mobile": False},
    {"name": "Laptop / Desktop (1280px)", "width": 1280, "height": 800, "is_mobile": False},
]

def test_no_horizontal_overflow(browser):
    """Ensure no page causes horizontal scrolling across any viewport."""
    print("\n--- Test 1: Zero Horizontal Overflow Across All Pages & Viewports ---")
    for page_path in PAGES:
        for vp in VIEWPORTS:
            page = browser.new_page(viewport={"width": vp["width"], "height": vp["height"]})
            page.goto(f"{BASE_URL}{page_path}", wait_until="domcontentloaded")
            page.wait_for_timeout(250)

            scroll_width = page.evaluate("() => document.documentElement.scrollWidth")
            client_width = page.evaluate("() => document.documentElement.clientWidth")
            
            assert scroll_width <= client_width, (
                f"Horizontal overflow on {page_path} at {vp['name']}! "
                f"scrollWidth={scroll_width} > clientWidth={client_width}"
            )
            print(f"  ✓ {page_path} [{vp['name']}] fits: {client_width}px")
            page.close()
    print("✓ All pages passed zero horizontal overflow check.")

def test_mobile_navigation_drawer(browser):
    """Test mobile menu button visibility, toggle state, and drawer opening."""
    print("\n--- Test 2: Mobile Navigation Drawer Interactivity ---")
    
    # 2a. Mobile screen (375px)
    page_mobile = browser.new_page(viewport={"width": 375, "height": 667})
    page_mobile.goto(f"{BASE_URL}/", wait_until="domcontentloaded")
    page_mobile.wait_for_timeout(250)

    # Hamburger button should be visible on mobile
    toggle_btn = page_mobile.locator("#mobile-menu-toggle")
    assert toggle_btn.is_visible(), "Mobile menu toggle button should be visible on < 640px"
    
    # Drawer should initially be hidden
    drawer = page_mobile.locator("#mobile-menu-drawer")
    assert not drawer.is_visible(), "Mobile menu drawer should initially be hidden"

    # Click toggle to open drawer
    toggle_btn.click()
    page_mobile.wait_for_timeout(200)
    assert drawer.is_visible(), "Mobile menu drawer should be visible after clicking hamburger"
    assert toggle_btn.get_attribute("aria-expanded") == "true", "aria-expanded should be true"

    # Click a link inside drawer and ensure it closes
    portfolio_link = drawer.locator("a[href='#projects']")
    portfolio_link.click()
    page_mobile.wait_for_timeout(200)
    assert not drawer.is_visible(), "Mobile menu drawer should close after clicking a nav link"
    print("  ✓ Mobile navigation open/close behavior verified on 375px viewport.")
    page_mobile.close()

    # 2b. Desktop screen (1280px)
    page_desktop = browser.new_page(viewport={"width": 1280, "height": 800})
    page_desktop.goto(f"{BASE_URL}/", wait_until="domcontentloaded")
    page_desktop.wait_for_timeout(250)

    # Mobile menu toggle should be hidden on desktop
    toggle_desktop = page_desktop.locator("#mobile-menu-toggle")
    assert not toggle_desktop.is_visible(), "Mobile menu toggle should be hidden on desktop (>= 640px)"

    # Desktop nav pill should be visible
    desktop_nav = page_desktop.locator("header nav")
    assert desktop_nav.is_visible(), "Desktop navbar pill should be visible on desktop (>= 640px)"
    print("  ✓ Desktop navbar vs mobile toggle visibility verified on 1280px viewport.")
    page_desktop.close()

def test_project_filtering_and_spotlight_on_mobile(browser):
    """Test company spotlight and map rendering on mobile viewport."""
    print("\n--- Test 3: Company Spotlight & Map Rendering on Mobile ---")
    page = browser.new_page(viewport={"width": 375, "height": 667})
    page.goto(f"{BASE_URL}/projects.html", wait_until="domcontentloaded")
    page.wait_for_timeout(400)

    # Click Monash Nova Rover company filter
    rover_btn = page.locator(".company-filter-btn[data-company='monash-nova-rover']")
    assert rover_btn.is_visible(), "Company filter button should be visible on mobile"
    rover_btn.click()
    page.wait_for_timeout(500)

    # Check spotlight is displayed
    spotlight = page.locator("#company-spotlight")
    assert spotlight.is_visible(), "Company spotlight should become visible"

    # Verify no horizontal overflow with spotlight and map open
    scroll_width = page.evaluate("() => document.documentElement.scrollWidth")
    client_width = page.evaluate("() => document.documentElement.clientWidth")
    assert scroll_width <= client_width, f"Overflow detected with spotlight active: {scroll_width} > {client_width}"

    # Verify Reset Filters button resets spotlight and displays all projects
    reset_btn = page.locator(".reset-filters-btn").first
    assert reset_btn.is_visible(), "Reset filters button should be visible"
    reset_btn.click()
    page.wait_for_timeout(300)
    assert not spotlight.is_visible(), "Spotlight should be hidden after reset"

    visible_cards = page.evaluate("() => document.querySelectorAll('#all-projects-container article:not([style*=\"display: none\"])').length")
    assert visible_cards >= 10, f"Expected all projects to be visible after reset, found {visible_cards}"
    print(f"  ✓ Company filter & reset on mobile passed with {visible_cards} cards visible.")
    page.close()

def run_all_tests():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        try:
            test_no_horizontal_overflow(browser)
            test_mobile_navigation_drawer(browser)
            test_project_filtering_and_spotlight_on_mobile(browser)
            print("\n🎉 ALL RESPONSIVE TESTS PASSED SUCCESSFULLY!")
        finally:
            browser.close()

if __name__ == "__main__":
    run_all_tests()
