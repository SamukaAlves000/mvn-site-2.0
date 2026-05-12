import {ChangeDetectionStrategy, Component, inject, signal, OnInit} from '@angular/core';
import {RouterOutlet, RouterLink, RouterLinkActive} from '@angular/router';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {animate} from 'motion';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule, MatIconModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  isMenuOpen = signal(false);

  ngOnInit() {
    // Initial entrance animations handled by component level hooks or direct CSS
  }

  toggleMenu() {
    this.isMenuOpen.update(v => !v);
  }
}
