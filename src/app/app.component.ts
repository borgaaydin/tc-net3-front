import { Component, OnInit } from '@angular/core';

import { VersionService } from './services/index';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'app';
  build: string = "";

  constructor(
      private versionService: VersionService,
  ) {}

  ngOnInit() {
      this.getBuildDate();
  }

  private getBuildDate() {
      this.versionService.get().subscribe(build => { this.build = build; });
  }
}
