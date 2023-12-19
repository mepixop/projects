import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

@Component({
  standalone: true,
  imports: [HeaderComponent, RouterModule],
  selector: 'projects-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'meal-planner';
}
