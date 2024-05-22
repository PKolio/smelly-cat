import { Component, HostListener, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'smelly-cat-contact';

  @ViewChild('navLinks', { static: false }) navLinks!: ElementRef;

  constructor() {}

  ngAfterViewInit() {
    this.adjustNavMenu(window.innerWidth);
  }

  // @HostListener listens for the window resize event and triggers onResize method
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.adjustNavMenu(window.innerWidth);
  }

  // Method to adjust the navigation menu based on the window width
  adjustNavMenu(windowWidth: number) {
    const navLinks = this.navLinks.nativeElement;

    // Toggle the display style of the navigation links based on window width
    if (windowWidth <= 768) {
      navLinks.style.display = 'none';
    } else {
      navLinks.style.display = 'flex';
    }
  }

  // Method to toggle the navigation menu display
  toggleNavMenu() {
    // Access the native element of navLinks
    const navLinks = this.navLinks.nativeElement;

    // Toggle the display style between 'flex' and 'none'
    if (navLinks.style.display === 'flex') {
      navLinks.style.display = 'none'; // Hide nav links if currently displayed
    } else {
      navLinks.style.display = 'flex'; // Show nav links if currently hidden
    }
  }
}
