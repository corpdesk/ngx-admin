import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SocketIoService {
  socket: any;
  readonly url: string = 'http://localhost:' + environment.SOCKET_IO_PORT;
  

  constructor() {
    this.socket = io('http://localhost:' + environment.SOCKET_IO_PORT);
    // this.socket = io.connect('https://localhost', {secure: true});
  }

  listen(eventName: string) {
    return new Observable(subscriber => {
      this.socket.on(eventName, data => {
        subscriber.next(data);
      });
    });
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }

  // ////////////////////////////////////////////
  // public sendMessage(message) {
  //   this.socket.emit('new-message', message);
  // }

  // public getMessages = () => {
  //   return Observable.create((observer) => {
  //     this.socket.on('new-message', (message) => {
  //       observer.next(message);
  //     });
  //   });
  // }
}
