import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EventI } from 'src/app/models/event-interface';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  events: EventI[] = [];
  onNewEvent = false;
  onUpdateEvent = false;
  newEvent: EventI = {
    eventName: '',
    eventDate: '',
    eventDesc: '',
    eventLocation: '',
  };
  updatedEventId: Number = 0;
  disabledSaveBtn = true;
  eventsForm: FormGroup;
  onOpenModal = false;
  eventeToDelete = {};

  constructor(
    private readonly eventsService: EventsService,
    private form: FormBuilder
  ) {
    this.eventsForm = this.form.group({
      input1: ['', this.newEvent.eventName],
      input2: ['', this.newEvent.eventDesc],
      input3: ['', this.newEvent.eventLocation],
      datetime: ['', this.newEvent.eventDate],
    });
  }

  ngOnInit(): void {
    this.prepareData();
  }

  async getEvents() {
    console.log('Botón!');
    const body1 = {
      eventName: 'Conferencia',
      eventDate: '2025-01-01',
      eventDesc: 'Ejemplo desc',
      eventLocation: 'Bogota',
    };

    const body2 = {
      eventName: 'Conferencia 2',
      eventDate: '2025-02-02',
      eventDesc: 'Ejemplo desc 2',
      eventLocation: 'Bogota',
    };

    this.events = await this.eventsService.getAllEvents();
    console.log('getall', this.events);

    // this.events = await this.eventsService.createEvent(body1);
    // console.log('create',this.events);

    // this.events = await this.eventsService.updateEvent(10, body2);
    // console.log('update', this.events);

    //  await this.eventsService.deleteEvent(7);
  }

  async prepareData() {
    await this.getEvents();
  }

  addEvent() {
    this.eventsForm.reset();
    this.onNewEvent = true;
    this.onUpdateEvent = false;
  }

  clearEvent() {
    this.onNewEvent = false;
    this.newEvent = {
      eventName: '',
      eventDate: '',
      eventDesc: '',
      eventLocation: '',
    };
  }

  async createEvent() {
    this.onNewEvent = false;
    console.log(this.newEvent);
    await this.eventsService.createEvent(this.newEvent);
  }

  updateEvent(event: any) {
    console.log(event);
    this.eventsForm.setValue({
      input1: event.eventName,
      input2: event.eventDesc,
      input3: event.eventLocation,
      datetime: event.eventDate,
    });

    this.updatedEventId = event.id;
    this.onNewEvent = true;
    this.onUpdateEvent = true;
  }

  async deleteEvent(event: any) {
    await this.eventsService.deleteEvent(event.id);
    await this.getEvents();
  }

  async onSubmit() {
    if (this.eventsForm.valid) {
      this.newEvent = {
        eventName: this.eventsForm.value.input1,
        eventDate: this.eventsForm.value.datetime,
        eventDesc: this.eventsForm.value.input2,
        eventLocation: this.eventsForm.value.input3,
      };
      console.log(this.newEvent);
      console.log(this.onUpdateEvent);

      if (!this.onUpdateEvent) {
        console.log('CREATE', this.eventsForm.value);
        this.createEvent();
      } else {
        console.log('UPDATE', this.eventsForm.value);
        await this.eventsService.updateEvent(
          this.updatedEventId,
          this.newEvent
        );
      }
    }
    await this.getEvents();
    this.onNewEvent = false;
  }

  onCancel() {
    this.eventsForm.reset();
    this.onNewEvent = false;
    this.newEvent = {
      eventName: '',
      eventDate: '',
      eventDesc: '',
      eventLocation: '',
    };
  }

  openModal(event:any) {
    this.onOpenModal = true;
    this.eventeToDelete = event;  
  }

  closeModal() {
    this.onOpenModal = false;
  }

  async onConfirm() {
    await this.deleteEvent(this.eventeToDelete);
    alert('Acción confirmada');
    this.closeModal();
  }
}
