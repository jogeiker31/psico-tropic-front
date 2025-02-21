import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { provideHttpClient } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

const serverConfig: ApplicationConfig = {
  
  providers: [
    provideServerRendering(),
    provideHttpClient(),
  
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
