'use strict';
/*
    Mazhit Nurasyl
    FAQ page JavaScript
*/
const faqData=[
	{ id:'question-one',category:'order',question:'Can I order online?',keywords:['order','online','food'] },
	{ id:'question-two',category:'order',question:'Do you have delivery?',keywords:['delivery','order'] },
	{ id:'question-three',category:'menu',question:'Where can I see the menu?',keywords:['menu','food','price'] },
	{ id:'question-four',category:'restaurant',question:'What are your opening hours?',keywords:['hours','open','time'] }
];
$(function(){
	const $faqAccordion=$('#faq-accordion');
	if($faqAccordion.length===0){
		return;
	}
	let $faqSearchInput;
	let $faqCategorySelect;
	let $faqResultCount;
	let $faqNoResults;
	let $faqResetButton;
	function filterFaq(searchText,category){
		const cleanText=searchText.trim().toLowerCase();
		return $.grep(faqData,function(item){
			const questionMatches=cleanText===''||item.question.toLowerCase().includes(cleanText);
			const keywordMatches=cleanText===''||$.grep(item.keywords,function(keyword){
				return keyword.includes(cleanText);
			}).length>0;
			const categoryMatches=category==='all'||item.category===category;
			return (questionMatches||keywordMatches)&&categoryMatches;
		});
	}
	/* Feature 3 rewritten with jQuery: FAQ search/filter/show-hide.
	   jQuery replaces createElement(), querySelector(), classList and addEventListener().
	   It is shorter because selectors, traversal, effects and events use one consistent API. */
	function createFaqSearch(){
		const $controls=$('<div>').attr('id','faq-search-controls').addClass('row g-3 align-items-end mb-4');
		const $searchColumn=$('<div>').addClass('col-12 col-md-6');
		$('<label>').addClass('form-label').attr('for','faq-search').text('Search FAQ').appendTo($searchColumn);
		$faqSearchInput=$('<input>').attr({id:'faq-search',type:'search','aria-label':'Search FAQ questions',placeholder:'Type order, delivery, menu...'}).addClass('form-control').appendTo($searchColumn);
		const $categoryColumn=$('<div>').addClass('col-12 col-md-3');
		$('<label>').addClass('form-label').attr('for','faq-category').text('Category').appendTo($categoryColumn);
		$faqCategorySelect=$('<select>').attr('id','faq-category').addClass('form-select').appendTo($categoryColumn);
		$.each([
			{value:'all',label:'All categories'},
			{value:'order',label:'Order'},
			{value:'menu',label:'Menu'},
			{value:'restaurant',label:'Restaurant'}
		],function(index,category){
			$('<option>').val(category.value).text(category.label).appendTo($faqCategorySelect);
		});
		const $resetColumn=$('<div>').addClass('col-12 col-md-3');
		$faqResetButton=$('<button>').attr({id:'faq-reset',type:'button'}).addClass('btn btn-outline-danger w-100').text('Reset').appendTo($resetColumn);
		$faqResultCount=$('<p>').attr('id','faq-result-count').addClass('small text-secondary mb-2');
		$faqNoResults=$('<div>').attr({id:'faq-no-results',role:'status'}).addClass('alert alert-warning d-none').text('No FAQ results found.');
		$controls.append($searchColumn,$categoryColumn,$resetColumn);
		$faqAccordion.before($controls,$faqResultCount,$faqNoResults);
	}
	function updateFaqDisplay(results){
		$faqAccordion.find('.accordion-item').each(function(){
			const $item=$(this);
			const questionId=$item.find('.accordion-collapse').attr('id');
			const matches=$.grep(results,function(result){
				return result.id===questionId;
			}).length>0;
			if(matches===true){
				$item.stop(true,true).slideDown(250);
			}else{
				$item.stop(true,true).slideUp(250);
			}
		});
		const count=results.length;
		$faqResultCount.html('<strong>Results:</strong> '+count+' of '+faqData.length);
		if(count===0){
			$faqNoResults.removeClass('d-none').stop(true,true).fadeIn(300);
		}else{
			$faqNoResults.stop(true,true).fadeOut(200,function(){
				$(this).addClass('d-none');
			});
		}
	}
	function applyFaqFilters(){
		const results=filterFaq($faqSearchInput.val(),$faqCategorySelect.val());
		updateFaqDisplay(results);
	}
	function resetFaqSearch(){
		/* Chain: select the search input -> clear its value -> remove error styling -> focus it. */
		$('#faq-search').val('').removeClass('is-invalid').trigger('focus');
		$faqCategorySelect.val('all');
		updateFaqDisplay(faqData);
	}
	createFaqSearch();
	updateFaqDisplay(faqData);
	$faqSearchInput.on('input',function(){
		const typedText=$(this).val();
		const results=filterFaq(typedText,$faqCategorySelect.val());
		updateFaqDisplay(results);
	});
	$faqCategorySelect.on('change',applyFaqFilters);
	$faqResetButton.on('click',resetFaqSearch);
	$faqAccordion.on('click','.accordion-button',function(){
		const $button=$(this);
		$button.closest('.accordion-item').toggleClass('state-selected',$button.hasClass('collapsed')!==true);
	});
	$('a[href="order.html"]').attr('data-jquery-link','order');
	$('button:first').attr('data-first-button','true');
});