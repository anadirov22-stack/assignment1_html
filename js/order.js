'use strict';
const products=[
	{id:'chicken-standard',name:'Chicken Doner — Standard',category:'doner',price:1895},
	{id:'chicken-large',name:'Chicken Doner — Large',category:'doner',price:2195},
	{id:'beef-standard',name:'Beef Doner — Standard',category:'doner',price:2195},
	{id:'beef-large',name:'Beef Doner — Large',category:'doner',price:2495},
	{id:'assorted-standard',name:'Assorted Doner — Standard',category:'doner',price:2095},
	{id:'assorted-large',name:'Assorted Doner — Large',category:'doner',price:2395}
];
const drinks=[
	{id:'coca-cola-450',name:'Coca-Cola 450 ml',category:'drink',price:795},
	{id:'coca-cola-500',name:'Coca-Cola 500 ml',category:'drink',price:845},
	{id:'coca-cola-zero-450',name:'Coca-Cola Zero Sugar 450 ml',category:'drink',price:795},
	{id:'coca-cola-zero-500',name:'Coca-Cola Zero Sugar 500 ml',category:'drink',price:845},
	{id:'fanta-450',name:'Fanta 450 ml',category:'drink',price:795},
	{id:'fanta-500',name:'Fanta 500 ml',category:'drink',price:845},
	{id:'sprite-450',name:'Sprite 450 ml',category:'drink',price:795},
	{id:'sprite-500',name:'Sprite 500 ml',category:'drink',price:845},
	{id:'fuse-tea-450',name:'Fuse Tea 450 ml',category:'drink',price:795},
	{id:'fuse-tea-500',name:'Fuse Tea 500 ml',category:'drink',price:845},
	{id:'bonaqua-500',name:'Bonaqua 500 ml',category:'drink',price:595},
	{id:'ayran-300',name:'Ayran 300 ml',category:'drink',price:595}
];
const extras=[
	{id:'extra-chicken',name:'Extra chicken 50 g',category:'extra',price:590},
	{id:'extra-beef',name:'Extra beef 50 g',category:'extra',price:690},
	{id:'extra-fries',name:'Fries',category:'extra',price:895},
	{id:'extra-sauce',name:'Sauce',category:'extra',price:200},
	{id:'extra-peppers',name:'Peppers',category:'extra',price:100}
];
const cart=[];
$(function(){
	const $orderForm=$('#order-form');
	if($orderForm.length===0){return;}
	const $foodSelect=$('#food');
	const $sizeSelect=$('#food-size');
	const $donerQuantity=$('#quantity');
	const $drinkSelect=$('#drink');
	const $drinkQuantity=$('#drink-quantity');
	const $nameInput=$('#name');
	const $phoneInput=$('#phone');
	const $dateInput=$('#order-date');
	const $timeInput=$('#order-time');
	const $confirmInput=$('#confirm');
	const $confirmationBox=$('#order-confirmation');
	const $errorBox=$('#order-error');
	const $onlinePaymentButton=$('#online-payment-button');
	let $addSelectionButton;
	let $clearCartButton;
	let $cartEmpty;
	let $cartItems;
	let $cartSummary;
	let resetFromSuccess=false;
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
		return 'DNA-'+(Math.floor(Math.random()*9000)+1000);
	}
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
		$confirmationBox.stop(true,true).text(message).removeClass('state-hidden').hide().fadeIn(300);
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
		$field.siblings('.js-field-error').remove();
		$field.closest('.col-12').find('.js-field-error').fadeOut(150,function(){
			$(this).remove();
		});
	}
	function isValidPhone(phone){
		const cleanPhone=phone.replace(/[\s()-]/g,'');
		return /^\+?[0-9]{10,15}$/.test(cleanPhone);
	}
	function isPastDate(dateValue){
		if(dateValue===''){return false;}
		const selectedDate=new Date(dateValue+'T00:00:00');
		const today=new Date();
		today.setHours(0,0,0,0);
		return selectedDate<today;
	}
	function isFridayBreak(dateValue,timeValue){
		if(dateValue===''||timeValue===''){return false;}
		const selectedDate=new Date(dateValue+'T00:00:00');
		return selectedDate.getDay()===5&&timeValue>='12:30'&&timeValue<'14:00';
	}
	function validateQuantity($input,min){
		const quantity=Number($input.val());
		return Number.isNaN(quantity)!==true&&quantity>=min&&quantity<=10;
	}
	function addOrUpdateCartItem(item,quantity){
		const existingItem=cart.find(function(cartItem){
			return cartItem.id===item.id;
		});
		if(existingItem!==undefined){
			existingItem.quantity=Math.min(existingItem.quantity+quantity,10);
		}else{
			cart.push({
				id:item.id,
				name:item.name,
				category:item.category,
				price:item.price,
				quantity:quantity
			});
		}
	}
	function getSelectedExtras(){
		const selected=[];
		$('[name="extras"]:checked').each(function(){
			const extra=findItemById(extras,$(this).val());
			if(extra!==undefined){selected.push(extra);}
		});
		return selected;
	}
	function resetSelection(){
		$foodSelect.val('');
		$sizeSelect.val('');
		$donerQuantity.val(1);
		$drinkSelect.val('');
		$drinkQuantity.val(0);
		$('[name="extras"]').prop('checked',false);
	}
	function createCartArea(){
		const $detailsFieldset=$orderForm.find('fieldset').last();
		const $actions=$detailsFieldset.find('.d-flex.flex-wrap.justify-content-center.gap-3.mt-4').first();
		const $cartArea=$('<div>').attr('id','jquery-cart-area').addClass('mt-4 border rounded p-3 bg-body-tertiary');
		const $cartHeading=$('<h3>').addClass('h5 mb-3').text('Shopping Cart');
		const $cartButtons=$('<div>').addClass('d-flex flex-wrap gap-2 mb-3');
		$addSelectionButton=$('<button>').attr({id:'add-selection',type:'button'}).addClass('btn btn-danger').text('Add to Cart');
		$clearCartButton=$('<button>').attr({id:'clear-cart',type:'button'}).addClass('btn btn-outline-dark').text('Clear Cart');
		$cartButtons.append($addSelectionButton,$clearCartButton);
		$cartEmpty=$('<p>').attr('id','cart-empty').addClass('mb-3 text-secondary').text('Cart is empty.');
		$cartItems=$('<div>').attr('id','cart-items');
		$cartSummary=$('<p>').attr('id','cart-summary').addClass('fw-bold mb-0');
		$cartArea.append($cartHeading,$cartButtons,$cartEmpty,$cartItems,$cartSummary);
		$cartArea.insertBefore($actions);
	}
	function renderCart(){
		$cartItems.empty();
		const isEmpty=cart.length===0;
		const totalQuantity=calculateTotalQuantity();
		$addSelectionButton.text(totalQuantity===0?'Add to Cart':'Add to Cart ('+totalQuantity+')');
		$clearCartButton.prop('disabled',isEmpty);
		if(isEmpty===true){
			$cartEmpty.stop(true,true).slideDown(200);
			$cartSummary.text('');
			return;
		}
		$cartEmpty.stop(true,true).slideUp(200);
		$.each(cart,function(index,item){
			const $item=$('<div>').addClass('cart-item border rounded p-3 mb-2 bg-white').attr('data-index',index).hide();
			const $top=$('<div>').addClass('d-flex flex-wrap justify-content-between align-items-center gap-2');
			$('<strong>').text(item.name).appendTo($top);
			$('<span>').addClass('badge text-bg-secondary').text(item.category).appendTo($top);
			const $price=$('<p>').addClass('mb-2 mt-2').text(item.price+' KZT × '+item.quantity+' = '+calculateItemTotal(item.price,item.quantity)+' KZT');
			const $controls=$('<div>').addClass('d-flex flex-wrap align-items-center gap-2');
			$('<button>').attr('type','button').addClass('btn btn-outline-dark btn-sm cart-control cart-decrease').text('−').appendTo($controls);
			$('<span>').addClass('badge text-bg-dark').text(item.quantity).appendTo($controls);
			$('<button>').attr('type','button').addClass('btn btn-outline-dark btn-sm cart-control cart-increase').text('+').appendTo($controls);
			$('<button>').attr('type','button').addClass('btn btn-outline-danger btn-sm cart-control cart-remove').text('Remove').appendTo($controls);
			$item.append($top,$price,$controls).appendTo($cartItems).fadeIn(200);
		});
		$cartSummary.html('<strong>Total items:</strong> '+totalQuantity+' | <strong>Final total:</strong> '+calculateCartTotal()+' KZT');
	}
	function addSelectionToCart(){
		clearMessages();
		clearFieldErrors();
		const foodValue=$foodSelect.val();
		const sizeValue=$sizeSelect.val();
		const drinkValue=$drinkSelect.val();
		const selectedExtras=getSelectedExtras();
		let firstInvalid=null;
		if(foodValue!==''&&sizeValue===''){
			addFieldError($sizeSelect,'Please choose a doner size.');
			firstInvalid=$sizeSelect;
		}
		if(foodValue===''&&sizeValue!==''){
			addFieldError($foodSelect,'Please choose a doner.');
			firstInvalid=firstInvalid||$foodSelect;
		}
		if(foodValue!==''&&sizeValue!==''&&validateQuantity($donerQuantity,1)!==true){
			addFieldError($donerQuantity,'Quantity must be from 1 to 10.');
			firstInvalid=firstInvalid||$donerQuantity;
		}
		if(drinkValue!==''&&validateQuantity($drinkQuantity,1)!==true){
			addFieldError($drinkQuantity,'Drink quantity must be from 1 to 10.');
			firstInvalid=firstInvalid||$drinkQuantity;
		}
		if(drinkValue===''&&Number($drinkQuantity.val())>0){
			addFieldError($drinkSelect,'Choose a drink or set quantity to 0.');
			firstInvalid=firstInvalid||$drinkSelect;
		}
		if(firstInvalid!==null){
			firstInvalid.trigger('focus');
			return;
		}
		const donerChosen=foodValue!==''&&sizeValue!=='';
		const drinkChosen=drinkValue!=='';
		if(donerChosen!==true&&drinkChosen!==true&&selectedExtras.length===0){
			showError('Choose at least one doner, drink or extra.');
			$foodSelect.trigger('focus');
			return;
		}
		let addedCount=0;
		if(donerChosen===true){
			const doner=findItemById(products,foodValue+'-'+sizeValue);
			if(doner!==undefined){
				addOrUpdateCartItem(doner,Number($donerQuantity.val()));
				addedCount+=1;
			}
		}
		if(drinkChosen===true){
			const drink=findItemById(drinks,drinkValue);
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
		showConfirmation(addedCount+' item type(s) added. Cart items: '+calculateTotalQuantity()+'. Current total: '+calculateCartTotal()+' KZT.');
		resetSelection();
	}
	function clearCart(){
		cart.length=0;
		renderCart();
		clearMessages();
		showConfirmation('Cart cleared.');
	}
	function validateCheckout(){
		clearFieldErrors();
		let valid=true;
		let firstInvalid=null;
		if(cart.length===0){
			showError('Your cart is empty. Add at least one item before checkout.');
			valid=false;
		}
		if($nameInput.val().trim()===''){
			addFieldError($nameInput,'Please enter your name.');
			firstInvalid=$nameInput;
			valid=false;
		}
		if(isValidPhone($phoneInput.val().trim())!==true){
			addFieldError($phoneInput,'Please enter a valid phone number.');
			firstInvalid=firstInvalid||$phoneInput;
			valid=false;
		}
		if($dateInput.val()===''){
			addFieldError($dateInput,'Please choose an order date.');
			firstInvalid=firstInvalid||$dateInput;
			valid=false;
		}else if(isPastDate($dateInput.val())===true){
			addFieldError($dateInput,'The order date cannot be in the past.');
			firstInvalid=firstInvalid||$dateInput;
			valid=false;
		}
		if($timeInput.val()===''){
			addFieldError($timeInput,'Please choose a preferred time.');
			firstInvalid=firstInvalid||$timeInput;
			valid=false;
		}else if(isFridayBreak($dateInput.val(),$timeInput.val())===true){
			addFieldError($timeInput,'Friday break is from 12:30 to 14:00. Please choose another time.');
			firstInvalid=firstInvalid||$timeInput;
			valid=false;
		}
		if(getOrderType()===''){
			const $pickup=$('#pickup');
			addFieldError($pickup,'Please choose Pickup or Delivery.',$pickup.closest('.col-12'));
			firstInvalid=firstInvalid||$pickup;
			valid=false;
		}
		if($confirmInput.prop('checked')!==true){
			addFieldError($confirmInput,'Please confirm your order information.',$confirmInput.closest('.col-12'));
			firstInvalid=firstInvalid||$confirmInput;
			valid=false;
		}
		return {valid:valid,field:firstInvalid};
	}
	function createOrderSummary(){
		return $.map(cart,function(item){
			return item.name+' × '+item.quantity;
		}).join(', ');
	}
	function setMinimumOrderDate(){
		const today=new Date();
		const year=today.getFullYear();
		const month=String(today.getMonth()+1).padStart(2,'0');
		const day=String(today.getDate()).padStart(2,'0');
		$dateInput.attr('min',year+'-'+month+'-'+day);
	}
	createCartArea();
	$orderForm.prop('noValidate',true);
	setMinimumOrderDate();
	renderCart();
	$addSelectionButton.on('click',addSelectionToCart);
	$clearCartButton.on('click',clearCart);
	$cartItems.on('click','.cart-control',function(){
		const $button=$(this);
		const $item=$button.closest('.cart-item');
		const index=Number($item.attr('data-index'));
		if(Number.isInteger(index)!==true||cart[index]===undefined){return;}
		if($button.hasClass('cart-increase')&&cart[index].quantity<10){
			cart[index].quantity+=1;
			renderCart();
			return;
		}
		if($button.hasClass('cart-decrease')&&cart[index].quantity>1){
			cart[index].quantity-=1;
			renderCart();
			return;
		}
		if($button.hasClass('cart-remove')){
			const removedName=cart[index].name;
			$item.fadeOut(250,function(){
				cart.splice(index,1);
				renderCart();
				showConfirmation(removedName+' was removed from the cart.');
			});
		}
	});
	$orderForm.on('submit',function(event){
		event.preventDefault();
		clearMessages();
		const validation=validateCheckout();
		if(validation.valid!==true){
			if($errorBox.text()===''){
				showError('Please correct the highlighted fields before checkout.');
			}
			if(validation.field!==null){
				validation.field.trigger('focus');
			}
			return;
		}
		const reference=createDemoReference();
		const message='Demo confirmation '+reference+' for '+$nameInput.val().trim()+'. Order: '+createOrderSummary()+'. Total items: '+calculateTotalQuantity()+'. Final total: '+calculateCartTotal()+' KZT. Order type: '+getOrderType()+'. Date: '+$dateInput.val()+', time: '+$timeInput.val()+'. No real restaurant order was created.';
		showConfirmation(message);
		resetFromSuccess=true;
		$orderForm.trigger('reset');
	});
	$orderForm.on('reset',function(){
		cart.length=0;
		clearFieldErrors();
		renderCart();
		if(resetFromSuccess===true){
			resetFromSuccess=false;
			return;
		}
		clearMessages();
		showConfirmation('Order form and cart were reset.');
	});
	$orderForm.on('input change','input, select, textarea',function(){
		clearOneFieldError($(this));
	});
	$('ol.list-group .list-group-item').on('click',function(){
		$(this).toggleClass('bg-danger text-white');
	});
	$onlinePaymentButton.prop('disabled',false).removeClass('btn-secondary').addClass('btn-outline-secondary').on('click',function(){
		showConfirmation('Online payment is not available in this demo. Use Submit Order to test the order process.');
	});
});