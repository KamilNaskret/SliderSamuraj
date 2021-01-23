import {imgArray} from './images.mjs'

class Slider{
    constructor(){
        this.images=null;
        this.slide=null;
        this.currentSlide=0;
        this.prevBtn=null;
        this.nextBtn=null;
        this.result=null;
        this.dots=null;
        this.dotsArray=null;
        this.initialize();
        this.addEventListeners();
    }
    initialize(){
        this.images=imgArray;
        this.slide=document.querySelector('[data-slide]');
        this.prevBtn=document.querySelector('[data-prev]');
        this.nextBtn=document.querySelector('[data-next]');
        this.result=document.querySelector('[data-result]');
        this.dots=document.querySelector('[data-dots]');
        this.makeDots();
        this.dotsArray=[...document.querySelectorAll('.slider__dot-btn')];
        this.makeSlide();
        this.disabled();
        this.changeResult();
    }
    makeDots(){
        for(let i=1;i<=this.images.length;i++){
            const li = document.createElement('li');
            const button = document.createElement('button');
            button.innerHTML=i;
            button.classList.add('slider__dot-btn');
            li.classList.add('slider__dot');
            li.appendChild(button);
            this.dots.appendChild(li);
        }
    }
    makeSlide(){
        this.slide.innerHTML='';
        const img = document.createElement('img');
        img.classList.add('slider__image')
        img.setAttribute('src',`${this.images[this.currentSlide]}`);
        this.slide.appendChild(img);
    }
    addEventListeners(){
        this.prevBtn.addEventListener('click',() => {
            this.changeSlide(this.currentSlide-1)
        });
        this.nextBtn.addEventListener('click',() => {
            this.changeSlide(this.currentSlide+1)
        });
        document.body.addEventListener('keydown',(e) => {
           e.keyCode===37?this.changeSlide(this.currentSlide-1)
           :e.keyCode===39?this.changeSlide(this.currentSlide+1):null;
        });
        this.dotsArray.forEach((dot) => {
            dot.addEventListener('click',(e) => {
                for(let i=0;i<this.dotsArray.length;i++){
                    this.dotsArray[i].classList.remove('active');
                }
                e.target.classList.add('active')
                this.changeSlide(this.dotsArray.indexOf(e.target));
            })
        })
    }
    changeSlide(index){
        if(index<0 || index>this.images.length-1) return;
        this.currentSlide=index;
        this.makeSlide();
        this.disabled();
        this.changeResult();
    }
    changeResult(){
        this.result.innerHTML=`${this.currentSlide+1}/${this.images.length}`;
    }
    disabled(){
        this.currentSlide===this.images.length-1?
            this.nextBtn.setAttribute('disabled',true):
            this.nextBtn.removeAttribute('disabled');
        this.currentSlide===0?
            this.prevBtn.setAttribute('disabled',true):
            this.prevBtn.removeAttribute('disabled');
    }

}

const slider = new Slider();