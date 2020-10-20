import { NgModule, LOCALE_ID } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { HttpClientModule  } from '@angular/common/http';
import { ServicesMessages} from './services/service-mensagem';
// tslint:disable-next-line:max-line-length
import { GrowlModule, ConfirmDialogModule, ConfirmationService, DialogModule, DropdownModule, AutoCompleteModule, CalendarModule, InputMaskModule, InputTextModule} from 'primeng/primeng';
import { NotificationsComponent } from './services/notifications-component';
import { NotificationsService } from './services/notificacao-mensagem';
import { LoadingService } from './services/loading-service';
import { EmpresaComponent } from './pages/cadastros/empresa/empresa.component';
import { FornecedorComponent } from './pages/cadastros/fornecedor/fornecedor.component';

@NgModule({
  declarations: [
    AppComponent,
    NotificationsComponent,
    EmpresaComponent,
    FornecedorComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    SlimLoadingBarModule,
    ReactiveFormsModule,
    CurrencyMaskModule,
    HttpClientModule,
    GrowlModule,
    ConfirmDialogModule,
    DialogModule,
    DropdownModule,
    AutoCompleteModule,
    CalendarModule,
    InputMaskModule,
    FormsModule,
    InputTextModule
  ],
  providers: [
     ServicesMessages,
     ConfirmationService ,
     NotificationsService,
     LoadingService,
     {provide: LOCALE_ID, useValue: 'pt'}
     ],
  bootstrap: [AppComponent]
})
export class AppModule { }
