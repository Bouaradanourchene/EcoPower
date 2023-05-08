import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from 'app/entities/Address';
import { Payment } from 'app/entities/Payment';
import { CartItem } from 'app/entities/cart-item';
import { Product } from 'app/entities/product';
import { CartService } from 'app/services/cart.service';
import { ProductService } from 'app/services/product.service';
import { CheckoutService } from 'app/services/checkout.service';
import { DateformService } from 'app/services/dateform.service';
import { Order } from 'app/entities/order';
import { OrderItem } from 'app/entities/order-item';
import { Purchase } from 'app/entities/Purchase';
import { Reponseachat } from 'app/entities/Reponseachat';
import { environment } from 'environments/environment';
import { event } from 'jquery';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  
  totalPrice: number = 0;
  totalQuantity: number = 0;
  checkoutFormGroup: FormGroup;
CreditCardYears: number[]=[];
CreditCardMonths: number[]=[];
//init stripe
stripe =Stripe(environment.stripePublishableKey);
cardElement: any;
displayError: any="";
payment: Payment = new Payment();

storage: Storage = sessionStorage;
  
  constructor( 
    private cartService: CartService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private checkoutService: CheckoutService,
    private formBuilder: FormBuilder,
    private dateformService: DateformService
  ) {}

  ngOnInit(): void {

    //setup stripepayment form 
    this.setupStripePaymentForm();
    this.reviewCartDetails();

  // read the user's email address from browser storage
    const theEmail = JSON.parse(this.storage.getItem('userEmail'));

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        email: new FormControl('',
                                    [Validators.required, 
                                     Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
            }),

            shippingAddress: this.formBuilder.group({
              street: new FormControl('', [Validators.required, Validators.minLength(2)]),
              city: new FormControl('', [Validators.required, Validators.minLength(2)]),
              zipCode: new FormControl('', [Validators.required, Validators.minLength(2)])
            }),
      
            billingAddress: this.formBuilder.group({
              street: new FormControl('', [Validators.required, Validators.minLength(2)]),
              city: new FormControl('', [Validators.required, Validators.minLength(2)]),
              zipCode: new FormControl('', [Validators.required, Validators.minLength(2)])
            }),
      
        creditCard: this.formBuilder.group({
          /*
          cardType: new FormControl('', [Validators.required]),
          nameOnCard:  new FormControl('', [Validators.required, Validators.minLength(2)]),
          cardNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]{16}')]),
          securityCode: new FormControl('', [Validators.required, Validators.pattern('[0-9]{3}')]),
          expirationMonth: [''],
          expirationYear: ['']*/
        })
  
    });
    /*
    
        // populate credit card months 
        const startMonth: number =new Date().getMonth()+1;
        console.log("startMonth:"+startMonth);
        this.dateformService.getCreditCardMonths(startMonth).subscribe(
          data => {
            console.log("Retrived credit card months:  "+ JSON.stringify(data));
            this.CreditCardMonths = data;
    
          }
        );
         // populate credit card years

this.dateformService.getCreditCardYears().subscribe(
  data => {
    console.log("Retrived credit card years:  "+ JSON.stringify(data));
    this.CreditCardYears = data;
   }
);*/

}
  
setupStripePaymentForm() {

  // get a handle to stripe elements
  var elements = this.stripe.elements();

  // Create a card element ... and hide the zip-code field
  this.cardElement = elements.create('card', { hidePostalCode: true });

  // Add an instance of card UI component into the 'card-element' div
  this.cardElement.mount('#card-element');

  // Add event binding for the 'change' event on the card element
  this.cardElement.on('change', (event) => {

    // get a handle to card-errors element
    this.displayError = document.getElementById('card-errors');

    if (event.complete) {
      this.displayError.textContent = "";
    } else if (event.error) {
      // show validation error to customer
      this.displayError.textContent = event.error.message;
    }

  });

}

  reviewCartDetails() {
    // subscribe to cartService.totalQuantity
    this.cartService.totalQuantity.subscribe(
      totalQuantity => this.totalQuantity = totalQuantity
    );

    // subscribe to cartService.totalPrice
    this.cartService.totalPrice.subscribe(
      totalPrice => this.totalPrice = totalPrice
    );


  }
  get email() { return this.checkoutFormGroup.get('user.email');}
  
  get shippingAddressStreet() { return this.checkoutFormGroup.get('shippingAddress.street'); }
  get shippingAddressCity() { return this.checkoutFormGroup.get('shippingAddress.city'); }
  get shippingAddressZipCode() { return this.checkoutFormGroup.get('shippingAddress.zipCode'); }

  get billingAddressStreet() { return this.checkoutFormGroup.get('billingAddress.street'); }
  get billingAddressCity() { return this.checkoutFormGroup.get('billingAddress.city'); }
  get billingAddressZipCode() { return this.checkoutFormGroup.get('billingAddress.zipCode'); }

  get creditCardType() { return this.checkoutFormGroup.get('creditCard.cardType'); }
  get creditCardNameOnCard() { return this.checkoutFormGroup.get('creditCard.nameOnCard'); }
  get creditCardNumber() { return this.checkoutFormGroup.get('creditCard.cardNumber'); }
  get creditCardSecurityCode() { return this.checkoutFormGroup.get('creditCard.securityCode'); }



onSubmit(): void {


 console.log("Handling the submit button") ;
 if (this.checkoutFormGroup.invalid) {
  this.checkoutFormGroup.markAllAsTouched();
  return;
}
//set up order
let order =new Order();
order.totalPrice= this.totalPrice;
//get cart item
const cartItems = this.cartService.cartItems;
//create orderitem from cartitem 
let orderitems: OrderItem[]=[];
for (let i=0;i< cartItems.length; i++)
{
 orderitems[i]=new OrderItem(cartItems[i]);
}
//set up achat
let purchase =new Purchase();
//populate achat -user
purchase.user =this.checkoutFormGroup.controls['customer'].value;
//populate achat shippingaddress
purchase.shippingAddress=this.checkoutFormGroup.controls['shippingAddress'].value;
//populate achat billingAddress
purchase.billingAddress=this.checkoutFormGroup.controls['billingAddress'].value;

//populate achat -order and orderitems
purchase.order = order;
purchase.orderItem= orderitems;

//compute payment
this.payment.amount =this.totalPrice*100;
this.payment.currency ="USD";
// if valid form then
    // - create payment intent
    // - confirm card payment
    // - place order
    if (!this.checkoutFormGroup.invalid && this.displayError.textContent === "") {

      this.checkoutService.createPaymentIntent(this.payment).subscribe(
        (paymentIntentResponse) => {
          this.stripe.confirmCardPayment(paymentIntentResponse.client_secret,
            {
              payment_method: {
                card: this.cardElement
              }
            }, { handleActions: false })
          .then((result: any) => {
            if (result.error) {
              // inform the customer there was an error
              alert(`There was an error: ${result.error.message}`);
            } else {
              // call REST API via the CheckoutService
              this.checkoutService.placeOrder(purchase).subscribe({
                next: (response: any) => {
                  alert(`Your order has been received.\nOrder tracking number: ${response.orderTrackingNumber}`);

                  // reset cart
                  this.resetCart();
                },
                error: (err: any) => {
                  alert(`There was an error: ${err.message}`);
                }
              })
            }            
          });
        }
      );
    } else {
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }

  }
  resetCart() {
     // reset cart data
     this.cartService.cartItems = [];
     this.cartService.totalPrice.next(0);
     this.cartService.totalQuantity.next(0);
     
     // reset the form
     this.checkoutFormGroup.reset();
 
     // navigate back to the products page
     this.router.navigateByUrl("/products");
 
  }

}

/*
handleMonthsAndYears() {

  const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

  const currentYear: number = new Date().getFullYear();
  const selectedYear: number = Number(creditCardFormGroup.value.expirationYear);

  // if the current year equals the selected year, then start with the current month

  let startMonth: number;

  if (currentYear === selectedYear) {
    startMonth = new Date().getMonth() + 1;
  }
  else {
    startMonth = 1;
  }

  this.dateformService.getCreditCardMonths(startMonth).subscribe(
    data => {
      console.log("Retrieved credit card months: " + JSON.stringify(data));
      this.CreditCardMonths = data;
    }
  );
}*/

 
 

