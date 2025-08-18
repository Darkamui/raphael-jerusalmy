/**
 * Accessibility utilities and WCAG compliance helpers
 */

export interface AccessibilityOptions {
  announcePageChanges?: boolean;
  enableKeyboardNavigation?: boolean;
  enableHighContrast?: boolean;
  reduceMotion?: boolean;
}

/**
 * Announce screen reader updates for dynamic content
 */
export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
  if (typeof window === 'undefined') return;

  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.style.position = 'absolute';
  announcement.style.left = '-10000px';
  announcement.style.width = '1px';
  announcement.style.height = '1px';
  announcement.style.overflow = 'hidden';
  
  document.body.appendChild(announcement);
  announcement.textContent = message;
  
  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

/**
 * Manage focus for modal dialogs and overlays
 */
export class FocusManager {
  private focusableElements: HTMLElement[] = [];
  private previousFocus: HTMLElement | null = null;

  constructor(private container: HTMLElement) {
    this.updateFocusableElements();
  }

  private updateFocusableElements(): void {
    const focusableSelectors = [
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'a[href]',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable]:not([contenteditable="false"])',
    ].join(', ');

    this.focusableElements = Array.from(
      this.container.querySelectorAll(focusableSelectors)
    ) as HTMLElement[];
  }

  trapFocus(): (() => void) {
    this.previousFocus = document.activeElement as HTMLElement;
    
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      if (this.focusableElements.length === 0) {
        event.preventDefault();
        return;
      }

      const firstElement = this.focusableElements[0];
      const lastElement = this.focusableElements[this.focusableElements.length - 1];

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    // Focus first element
    this.focusableElements[0]?.focus();

    // Return cleanup function
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      this.restoreFocus();
    };
  }

  restoreFocus(): void {
    this.previousFocus?.focus();
  }
}

/**
 * Check for reduced motion preference
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Check for high contrast preference
 */
export function prefersHighContrast(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-contrast: high)').matches;
}

/**
 * Generate accessible color combinations
 */
export function getContrastRatio(color1: string, color2: string): number {
  // Simplified contrast ratio calculation
  // In a real implementation, you'd want a more robust color parsing library
  const getLuminance = (color: string): number => {
    // This is a simplified implementation
    // You'd want to use a proper color library for production
    const hex = color.replace('#', '');
    if (hex.length < 6) return 0; // Invalid hex color
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;
    
    const sRGB = [r, g, b].map(c => {
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * (sRGB[0] || 0) + 0.7152 * (sRGB[1] || 0) + 0.0722 * (sRGB[2] || 0);
  };

  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  
  return (brightest + 0.05) / (darkest + 0.05);
}

/**
 * Check if color combination meets WCAG standards
 */
export function meetsWCAGContrast(foreground: string, background: string, level: 'AA' | 'AAA' = 'AA'): boolean {
  const ratio = getContrastRatio(foreground, background);
  return level === 'AA' ? ratio >= 4.5 : ratio >= 7;
}

/**
 * Keyboard navigation helper
 */
export function handleArrowNavigation(
  event: KeyboardEvent,
  items: HTMLElement[],
  currentIndex: number,
  options: { wrap?: boolean; orientation?: 'horizontal' | 'vertical' } = {}
): number {
  const { wrap = true, orientation = 'vertical' } = options;
  let newIndex = currentIndex;

  const isNext = orientation === 'vertical' 
    ? ['ArrowDown', 'Down'].includes(event.key)
    : ['ArrowRight', 'Right'].includes(event.key);
    
  const isPrev = orientation === 'vertical'
    ? ['ArrowUp', 'Up'].includes(event.key)
    : ['ArrowLeft', 'Left'].includes(event.key);

  if (isNext) {
    newIndex = currentIndex + 1;
    if (newIndex >= items.length) {
      newIndex = wrap ? 0 : items.length - 1;
    }
  } else if (isPrev) {
    newIndex = currentIndex - 1;
    if (newIndex < 0) {
      newIndex = wrap ? items.length - 1 : 0;
    }
  }

  if (newIndex !== currentIndex) {
    event.preventDefault();
    items[newIndex]?.focus();
  }

  return newIndex;
}

/**
 * Generate accessible IDs for form elements
 */
export function generateAccessibleId(prefix: string = 'accessible'): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Enhanced skip link functionality
 */
export function createSkipLink(targetId: string, text: string = 'Skip to main content'): HTMLElement {
  const skipLink = document.createElement('a');
  skipLink.href = `#${targetId}`;
  skipLink.textContent = text;
  skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded';
  
  skipLink.addEventListener('click', (event) => {
    event.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.focus();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });

  return skipLink;
}

/**
 * Accessibility audit helper
 */
export interface AccessibilityIssue {
  type: 'error' | 'warning';
  element: HTMLElement;
  message: string;
  wcagReference?: string;
}

export function basicAccessibilityAudit(): AccessibilityIssue[] {
  if (typeof window === 'undefined') return [];

  const issues: AccessibilityIssue[] = [];

  // Check for images without alt text
  document.querySelectorAll('img').forEach(img => {
    if (!img.getAttribute('alt') && !img.getAttribute('aria-labelledby')) {
      issues.push({
        type: 'error',
        element: img,
        message: 'Image missing alt text',
        wcagReference: 'WCAG 1.1.1'
      });
    }
  });

  // Check for buttons without accessible names
  document.querySelectorAll('button').forEach(button => {
    const hasText = button.textContent?.trim();
    const hasAriaLabel = button.getAttribute('aria-label');
    const hasAriaLabelledBy = button.getAttribute('aria-labelledby');
    
    if (!hasText && !hasAriaLabel && !hasAriaLabelledBy) {
      issues.push({
        type: 'error',
        element: button,
        message: 'Button missing accessible name',
        wcagReference: 'WCAG 4.1.2'
      });
    }
  });

  // Check for form inputs without labels
  document.querySelectorAll('input, select, textarea').forEach(input => {
    const hasLabel = document.querySelector(`label[for="${input.id}"]`);
    const hasAriaLabel = input.getAttribute('aria-label');
    const hasAriaLabelledBy = input.getAttribute('aria-labelledby');
    
    if (!hasLabel && !hasAriaLabel && !hasAriaLabelledBy) {
      issues.push({
        type: 'error',
        element: input as HTMLElement,
        message: 'Form control missing label',
        wcagReference: 'WCAG 3.3.2'
      });
    }
  });

  return issues;
}