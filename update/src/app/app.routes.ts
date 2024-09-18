import { Routes } from '@angular/router';
import { UpdateContractorComponent } from './Contractor/update-contractor/update-contractor.component';
import { DeleteContractorComponent } from './Contractor/delete-contractor/delete-contractor.component';
import { CreateContractorComponent } from './Contractor/create-contractor/create-contractor.component';
import { ReadContractorComponent } from './Contractor/read-contractor/read-contractor.component';
import { CreateLaborComponent } from './Labor/create-labor/create-labor.component';
import { LaborUpdateComponent } from './Labor/labor-update/labor-update.component';
import { LaborDeleteComponent } from './Labor/labor-delete/labor-delete.component';
import { LaborReadComponent } from './Labor/labor-read/labor-read.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    { path: 'contractors/update/:id', component: UpdateContractorComponent },
    { path: 'contractors/delete/:id', component: DeleteContractorComponent },
    { path: 'contractors/create', component: CreateContractorComponent },
    { path: 'contractors/read', component: ReadContractorComponent },
    { path: 'labor/create', component: CreateLaborComponent },
    { path: 'labor/update/:id', component: LaborUpdateComponent },
    { path: 'labor/delete/:id', component: LaborDeleteComponent },
    { path: 'labor/read', component: LaborReadComponent },
    {path: "login" , component: LoginComponent}

];
