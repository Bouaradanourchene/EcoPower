import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Achat } from '../entities/Achat';
import { Payment } from '../entities/Payment';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private achatUrl = 'http://localhost:9090/checkout/achat';

  private paymentUrl = 'http://localhost:9090/checkout/payment';
  

  constructor(private httpClient: HttpClient) { }

  placeOrder(achat: Achat): Observable<any> {
    return this.httpClient.post<Achat>(this.achatUrl, achat);    
  }

  createPaymentIntent(payment: Payment): Observable<any> {
    return this.httpClient.post<Payment>(this.paymentUrl, payment);
  }

}
