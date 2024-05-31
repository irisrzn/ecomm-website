import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CheckoutService } from '../services/checkout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  orderResponse: any;

  constructor(
    private fb: FormBuilder,
    private cartService: CheckoutService,
    private router: Router
  ) {
    this.checkoutForm = this.fb.group({
      country: ['', Validators.required],
      street1: ['', Validators.required],
      street2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required]
    });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.checkoutForm.invalid) {
      return;
    }

    this.cartService.placeOrder(this.checkoutForm.value).subscribe(
      response => {
        this.orderResponse = response;
        // Optionally navigate to order confirmation page
        // this.router.navigate(['/order-confirmation']);
      },
      error => {
        console.error('Error placing order', error);
        this.orderResponse = { message: 'Error placing order', error: error.error };
      }
    );
  }
}
