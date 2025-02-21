import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';

import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, MatToolbarModule],
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements OnInit {
  currentTime: Date = new Date();
  iniciarInterval = () => {
    if (this.isBrowser()) {
      setInterval(() => {
        this.currentTime = new Date();
      }, 1000);
    }
  };

  isBrowser = signal(false); // a signal to store if platform is browser

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser.set(isPlatformBrowser(platformId)); // save isPlatformBrowser in signal
  }
  ngOnInit(): void {
    this.iniciarInterval();
  }
}
