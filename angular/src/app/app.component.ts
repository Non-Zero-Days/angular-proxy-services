import { Component } from '@angular/core';
import { ProxyService } from './proxy.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'non-zero-app';
  motd: string = '';

  constructor(private proxyService: ProxyService) {
    this.proxyService.getMotD().subscribe(data => {
      this.motd = data;
    });
  }
}
