import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContactService } from '../contact.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  constructor(private contactService: ContactService, private dialog: MatDialog) { }

  submitForm(event: Event) {
    event.preventDefault();
    const formData = {
      fullName: (document.getElementById('fullName') as HTMLInputElement).value,
      email: (document.getElementById('email') as HTMLInputElement).value,
      city: (document.getElementById('city') as HTMLInputElement).value,
      postalCode: (document.getElementById('postalCode') as HTMLInputElement).value,
      address: (document.getElementById('address') as HTMLInputElement).value,
      message: (document.getElementById('message') as HTMLInputElement).value,
    };

    // Check if the required fields are empty
    if (!formData.fullName || !formData.email || !formData.city || !formData.postalCode || !formData.address) {
      this.openDialog('All fields except for the message are required.');
      return;
    }

    this.contactService.sendMessage(formData)
      .subscribe(
        (response) => {
          console.log('Email sent successfully:', response);
          this.openDialog('Message sent successfully');
          this.resetForm();
        },
        (error) => {
          console.error('Error sending email:', error);
          this.openDialog('Error sending email');
        }
      );
  }

  resetForm() {
    (document.getElementById('fullName') as HTMLInputElement).value = '';
    (document.getElementById('email') as HTMLInputElement).value = '';
    (document.getElementById('city') as HTMLInputElement).value = '';
    (document.getElementById('postalCode') as HTMLInputElement).value = '';
    (document.getElementById('address') as HTMLInputElement).value = '';
    (document.getElementById('message') as HTMLInputElement).value = '';
  }

  openDialog(message: string): void {
    this.dialog.open(DialogComponent, {
      data: { message: message }
    });
  }
}
