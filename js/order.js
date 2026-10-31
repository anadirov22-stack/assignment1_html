'use strict';
/*
    Mazhit Nurasyl-
    ORDER page JavaScript
*/
const products=[
	{ id:'chicken-standard',name:'Chicken Doner — Standard',category:'doner',price:1895 },
	{ id:'chicken-large',name:'Chicken Doner — Large',category:'doner',price:2195 },
	{ id:'beef-standard',name:'Beef Doner — Standard',category:'doner',price:2195 },
	{ id:'beef-large',name:'Beef Doner — Large',category:'doner',price:2495 },
	{ id:'assorted-standard',name:'Assorted Doner — Standard',category:'doner',price:2095 },
	{ id:'assorted-large',name:'Assorted Doner — Large',category:'doner',price:2395 }
];
const drinks=[
	{ id:'coca-cola-450',name:'Coca-Cola 450 ml',category:'drink',price:795 },
	{ id:'coca-cola-500',name:'Coca-Cola 500 ml',category:'drink',price:845 },
	{ id:'coca-cola-zero-450',name:'Coca-Cola Zero Sugar 450 ml',category:'drink',price:795 },
	{ id:'coca-cola-zero-500',name:'Coca-Cola Zero Sugar 500 ml',category:'drink',price:845 },
	{ id:'fanta-450',name:'Fanta 450 ml',category:'drink',price:795 },
	{ id:'fanta-500',name:'Fanta 500 ml',category:'drink',price:845 },
	{ id:'sprite-450',name:'Sprite 450 ml',category:'drink',price:795 },
	{ id:'sprite-500',name:'Sprite 500 ml',category:'drink',price:845 },
	{ id:'fuse-tea-450',name:'Fuse Tea 450 ml',category:'drink',price:795 },
	{ id:'fuse-tea-500',name:'Fuse Tea 500 ml',category:'drink',price:845 },
	{ id:'bonaqua-500',name:'Bonaqua 500 ml',category:'drink',price:595 },
	{ id:'ayran-300',name:'Ayran 300 ml',category:'drink',price:595 }
];
const extras=[
	{ id:'extra-chicken',name:'Extra chicken 50 g',category:'extra',price:590 },
	{ id:'extra-beef',name:'Extra beef 50 g',category:'extra',price:690 },
	{ id:'extra-fries',name:'Fries',category:'extra',price:895 },
	{ id:'extra-sauce',name:'Sauce',category:'extra',price:200 },
	{ id:'extra-peppers',name:'Peppers',category:'extra',price:100 }
];
const cart=[];
function findItemById(items,id){
	return items.find(function(item){
		return item.id===id;
	});
}
function calculateItemTotal(price,quantity){
	return price*quantity;
}
function calculateCartTotal(){
	return cart.reduce(function(total,item){
		return total+calculateItemTotal(item.price,item.quantity);
	},0);
}
function calculateTotalQuantity(){
	return cart.reduce(function(total,item){
		return total+item.quantity;
	},0);
}
function createDemoReference(){
	const randomNumber=Math.floor(Math.random()*9000)+1000;
	return 'DNA-'+randomNumber;
}
$(function(){
	const $orderForm=$('#order-form');
	if($orderForm.length===0){
		return;
	}
	const $donerSelect=$('#doner-product');
	const $donerQuantity=$('#doner-quantity');
	const $drinkSelect=$('#drink-product');
	const $drinkQuantity=$('#drink-quantity');
	const $cartEmpty=$('#cart-empty');
	const $cartItems=$('#cart-items');
	const $cartSummary=$('#cart-summary');
	const $clearCartButton=$('#clear-cart');
	const $nameInput=$('#name');
	const $emailInput=$('#email');
	const $phoneInput=$('#phone');
	const $dateInput=$('#order-date');
	const $timeInput=$('#order-time');
	const $confirmInput=$('#confirm');
	const $confirmationBox=$('#order-confirmation');
	const $errorBox=$('#order-error');
	function getOrderType(){
		return $('[name="type"]:checked').val()||'';
	}
	function clearMessages(){
		$confirmationBox.stop(true,true).hide().text('').addClass('state-hidden');
		$errorBox.stop(true,true).hide().text('').addClass('state-hidden');
	}
	function showError(message){
		$errorBox.stop(true,true).text(message).removeClass('state-hidden').hide().fadeIn(250);
	}
	function showConfirmation(message){
		$confirmationBox.stop(true,true).text(message).removeClass('state-hidden').hide().fadeIn(300,function(){
			$(this).attr('data-effect-complete','true');
		});
	}
	function clearFieldErrors(){
		$('.js-field-error').remove();
		$orderForm.find('.is-invalid').removeClass('is-invalid');
	}
	function addFieldError($field,message,$container){
		$field.addClass('is-invalid');
		const $error=$('<div>').addClass('js-field-error text-danger small mt-1').text(message).hide();
		const $target=$container&&$container.length?$container:$field.parent();
		$target.append($error);
		$error.fadeIn(180);
	}
	function clearOneFieldError($field){
		$field.removeClass('is-invalid');
		let $errorScope=$field.parent();
		if($field.is('[name="type"]')||$field.attr('id')==='confirm'){
			$errorScope=$field.closest('.col-12');
		}
		$field.siblings('.js-field-error').stop(true,true).fadeOut(150,function(){
			$(this).remove();
		});
		$errorScope.find('.js-field-error').stop(true,true).fadeOut(150,function(){
			$(this).remove();
		});
	}
	function isValidEmail(email){
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	}
	function isValidPhone(phone){
		const cleanPhone=phone.replace(/[\s()-]/g,'');
		return /^\+?[0-9]{10,15}$/.test(cleanPhone);
	}
	function isPastDate(dateValue){
		if(dateValue===''){
			return false;
		}
		const selectedDate=new Date(dateValue+'T00:00:00');
		const today=new Date();
		today.setHours(0,0,0,0);
		return selectedDate<today;
	}
	function isFridayBreak(dateValue,timeValue){
		if(dateValue===''||timeValue===''){
			return false;
		}
		const selectedDate=new Date(dateValue+'T00:00:00');
		return selectedDate.getDay()===5&&timeValue>='12:30'&&timeValue<'14:00';
	}
	function validateQuantity($input){
		const quantity=Number($input.val());
		return Number.isNaN(quantity)!==true&&quantity>=1&&quantity<=10;
	}
	function addOrUpdateCartItem(item,quantity){
		const existingItem=cart.find(function(cartItem){
			return cartItem.id===item.id;
		});
		if(existingItem!==undefined){
			existingItem.quantity=Math.min(existingItem.quantity+quantity,10);
		}else{
			cart.push({id:item.id,name:item.name,category:item.category,price:item.price,quantity:quantity});
		}
	}
	function getSelectedExtras(){
		const selected=[];
		$('.extra-option:checked').each(function(){
			const extra=findItemById(extras,$(this).val());
			if(extra!==undefined){
				selected.push(extra);
			}
		});
		return selected;
	}
	function resetSelection(){
		$donerSelect.val('');
		$drinkSelect.val('');
		$donerQuantity.val(1);
		$drinkQuantity.val(1);
		$('.extra-option').prop('checked',false);
	}
	/* Feature 1 rewritten with jQuery: cart rendering and cart controls.
	   jQuery replaces createElement(), append(), classList and direct addEventListener calls.
	   The delegated handler is shorter because one parent handles future dynamic buttons. */
	function renderCart(){
		$cartItems.empty();
		const isEmpty=cart.length===0;
		$cartEmpty.toggleClass('d-none',!isEmpty);
		$clearCartButton.prop('disabled',isEmpty);
		$('#shopping-cart').toggleClass('state-active',!isEmpty);
		if(isEmpty){
			$cartSummary.text('');
			return;
		}
		$.each(cart,function(index,item){
			const $item=$('<div>').addClass('cart-item border rounded p-3 mb-3 bg-body-tertiary').attr('data-index',index);
			const $topRow=$('<div>').addClass('d-flex flex-wrap justify-content-between gap-2');
			$('<h3>').addClass('h6 mb-1').text(item.name).appendTo($topRow);
			$('<span>').addClass('badge text-bg-secondary').text(item.category).appendTo($topRow);
			const $price=$('<p>').addClass('mb-2').text(item.price+' KZT × '+item.quantity+' = '+calculateItemTotal(item.price,item.quantity)+' KZT');
			const $controls=$('<div>').addClass('d-flex flex-wrap align-items-center gap-2');
			$('<button>').attr('type','button').addClass('btn btn-outline-dark btn-sm cart-control cart-decrease').text('−').appendTo($controls);
			$('<span>').addClass('badge text-bg-dark cart-quantity').text(String(item.quantity)).appendTo($controls);
			$('<button>').attr('type','button').addClass('btn btn-outline-dark btn-sm cart-control cart-increase').text('+').appendTo($controls);
			$('<button>').attr('type','button').addClass('btn btn-outline-danger btn-sm cart-control cart-remove').text('Remove').appendTo($controls);
			$item.append($topRow,$price,$controls).appendTo($cartItems);
		});
		$cartSummary.text('Total items: '+calculateTotalQuantity()+' | Final total: '+calculateCartTotal()+' KZT');
	}
	function addSelectionToCart(){
		clearMessages();
		clearFieldErrors();
		const donerChosen=$donerSelect.val()!=='';
		const drinkChosen=$drinkSelect.val()!=='';
		const selectedExtras=getSelectedExtras();
		if(donerChosen===true&&validateQuantity($donerQuantity)!==true){
			addFieldError($donerQuantity,'Quantity must be from 1 to 10.');
			$donerQuantity.trigger('focus');
			return;
		}
		if(drinkChosen===true&&validateQuantity($drinkQuantity)!==true){
			addFieldError($drinkQuantity,'Quantity must be from 1 to 10.');
			$drinkQuantity.trigger('focus');
			return;
		}
		if(donerChosen!==true&&drinkChosen!==true&&selectedExtras.length===0){
			showError('Choose at least one doner, drink or extra.');
			$donerSelect.trigger('focus');
			return;
		}
		let addedCount=0;
		if(donerChosen===true){
			const doner=findItemById(products,$donerSelect.val());
			if(doner!==undefined){
				addOrUpdateCartItem(doner,Number($donerQuantity.val()));
				addedCount+=1;
			}
		}
		if(drinkChosen===true){
			const drink=findItemById(drinks,$drinkSelect.val());
			if(drink!==undefined){
				addOrUpdateCartItem(drink,Number($drinkQuantity.val()));
				addedCount+=1;
			}
		}
		$.each(selectedExtras,function(index,extra){
			addOrUpdateCartItem(extra,1);
			addedCount+=1;
		});
		renderCart();
		showConfirmation(addedCount+' item type(s) added to the cart. Current total: '+calculateCartTotal()+' KZT.');
		resetSelection();
	}
	$('#add-selection').on('click',addSelectionToCart);
	$clearCartButton.on('click',function(){
		cart.length=0;
		renderCart();
		clearMessages();
		showConfirmation('Cart cleared.');
	});
	$cartItems.on('click','.cart-control',function(){
		const $button=$(this);
		const $item=$button.closest('.cart-item');
		const index=Number($item.attr('data-index'));
		const item=cart[index];
		if(item===undefined){
			return;
		}
		if($button.hasClass('cart-increase')&&item.quantity<10){
			item.quantity+=1;
			renderCart();
		}else if($button.hasClass('cart-decrease')&&item.quantity>1){
			item.quantity-=1;
			renderCart();
		}else if($button.hasClass('cart-remove')){
			$item.stop(true,true).fadeOut(250,function(){
				cart.splice(index,1);
				renderCart();
				showConfirmation(item.name+' was removed from the cart.');
			});
		}
	});
	/* Feature 2 rewritten with jQuery: order form validation.
	   jQuery replaces querySelector/value/checked/classList and manual DOM insertion.
	   The validation is clearer because every field uses the same jQuery error helpers. */
	function validateCheckout(){
		clearFieldErrors();
		const name=$nameInput.val().trim();
		const email=$emailInput.val().trim();
		const phone=$phoneInput.val().trim();
		const orderType=getOrderType();
		let valid=true;
		let $firstInvalid=$();
		if(cart.length===0){
			showError('Your cart is empty. Add at least one item before checkout.');
			valid=false;
		}
		if(name===''){
			addFieldError($nameInput,'Please enter your name.');
			$firstInvalid=$nameInput;
			valid=false;
		}
		if(email===''||isValidEmail(email)!==true){
			addFieldError($emailInput,'Please enter a valid email address.');
			if($firstInvalid.length===0){
				$firstInvalid=$emailInput;
			}
			valid=false;
		}
		if(phone===''||isValidPhone(phone)!==true){
			addFieldError($phoneInput,'Please enter a valid phone number.');
			if($firstInvalid.length===0){
				$firstInvalid=$phoneInput;
			}
			valid=false;
		}
		if($dateInput.val()===''){
			addFieldError($dateInput,'Please choose an order date.');
			if($firstInvalid.length===0){
				$firstInvalid=$dateInput;
			}
			valid=false;
		}else if(isPastDate($dateInput.val())===true){
			addFieldError($dateInput,'The order date cannot be in the past.');
			if($firstInvalid.length===0){
				$firstInvalid=$dateInput;
			}
			valid=false;
		}
		if($timeInput.val()===''){
			addFieldError($timeInput,'Please choose a preferred time.');
			if($firstInvalid.length===0){
				$firstInvalid=$timeInput;
			}
			valid=false;
		}else if(isFridayBreak($dateInput.val(),$timeInput.val())===true){
			addFieldError($timeInput,'Friday break is from 12:30 to 14:00. Please choose another time.');
			if($firstInvalid.length===0){
				$firstInvalid=$timeInput;
			}
			valid=false;
		}
		if(orderType===''){
			const $pickup=$('#pickup');
			addFieldError($pickup,'Please choose Pickup or Delivery.',$pickup.closest('.col-12'));
			if($firstInvalid.length===0){
				$firstInvalid=$pickup;
			}
			valid=false;
		}
		if($confirmInput.prop('checked')!==true){
			addFieldError($confirmInput,'Please confirm your order information.',$confirmInput.closest('.col-12'));
			if($firstInvalid.length===0){
				$firstInvalid=$confirmInput;
			}
			valid=false;
		}
		return {valid:valid,firstInvalid:$firstInvalid};
	}
	function createOrderSummary(){
		return $.map(cart,function(item){
			return item.name+' × '+item.quantity;
		}).join(', ');
	}
	$orderForm.on('submit',function(event){
		event.preventDefault();
		clearMessages();
		const validation=validateCheckout();
		if(validation.valid!==true){
			if($errorBox.text()===''){
				showError('Please correct the highlighted fields before checkout.');
			}
			if(validation.firstInvalid.length>0){
				validation.firstInvalid.trigger('focus');
			}
			return;
		}
		const reference=createDemoReference();
		const message='Demo confirmation '+reference+' for '+$nameInput.val().trim()+'. Order: '+createOrderSummary()+'. Total items: '+calculateTotalQuantity()+'. Final total: '+calculateCartTotal()+' KZT. Order type: '+getOrderType()+'. Date: '+$dateInput.val()+', time: '+$timeInput.val()+'. No data was sent to a server and no real restaurant order was created.';
		showConfirmation(message);
		$orderForm.trigger('reset');
		cart.length=0;
		renderCart();
	});
	$orderForm.on('input change','input, select, textarea',function(){
		const $field=$(this);
		clearOneFieldError($field);
	});
	$('#reset-order').on('click',function(){
		cart.length=0;
		clearMessages();
		clearFieldErrors();
		renderCart();
	});
	function setMinimumOrderDate(){
		const today=new Date();
		const year=today.getFullYear();
		const month=String(today.getMonth()+1).padStart(2,'0');
		const day=String(today.getDate()).padStart(2,'0');
		$dateInput.attr('min',year+'-'+month+'-'+day);
	}
	$('button[type="button"]').attr('data-jquery-events','enabled');
	$orderForm.find('input, select, textarea').attr('data-jquery-bound','true');
	setMinimumOrderDate();
	renderCart();
});