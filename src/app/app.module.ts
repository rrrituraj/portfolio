import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Routes, RouterModule} from "@angular/router";
import { AppComponent } from './app.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { HeaderComponent } from './header/header.component';
import { AboutComponent } from './about/about.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ResumeComponent } from './resume/resume.component';
import { ContactComponent } from './contact/contact.component';
import { CnaSocketComponent } from './cna-socket/cna-socket.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {path:'', component:PortfolioComponent},
  {path:'about', component:AboutComponent},
  {path:'resume', component:ResumeComponent},
  {path:'contact', component:ContactComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    PortfolioComponent,
    HeaderComponent,
    AboutComponent,
    ResumeComponent,
    ContactComponent,
    CnaSocketComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    AngularFontAwesomeModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
