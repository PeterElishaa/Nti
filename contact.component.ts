import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  sendMessage(event: Event) {
    event.preventDefault(); 
    alert('Message sent successfully'); 
  }
}
