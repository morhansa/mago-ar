/*! nouislider - 15.7.1 - 6/14/2023 */
(function(global,factory){'use strict';factory(global.noUiSlider={})}(this,(function(exports){'use strict';var nouislider;var defaultFormatter={to:function(value){return value===undefined?'':value.toFixed(2)},from:Number};var cssClasses={target:'target',base:'base',origin:'origin',handle:'handle',handleLower:'handle-lower',handleUpper:'handle-upper',touchArea:'touch-area',horizontal:'horizontal',vertical:'vertical',background:'background',connect:'connect',connects:'connects',ltr:'ltr',rtl:'rtl',textDirectionLtr:'txt-dir-ltr',textDirectionRtl:'txt-dir-rtl',draggable:'draggable',drag:'state-drag',tap:'state-tap',active:'active',tooltip:'tooltip',pips:'pips',pipsHorizontal:'pips-horizontal',pipsVertical:'pips-vertical',marker:'marker',markerHorizontal:'marker-horizontal',markerVertical:'marker-vertical',markerNormal:'marker-normal',markerLarge:'marker-large',markerSub:'marker-sub',value:'value',valueHorizontal:'value-horizontal',valueVertical:'value-vertical',valueNormal:'value-normal',valueLarge:'value-large',valueSub:'value-sub'};var INTERNAL_EVENT_NS={tooltips:'.__tooltips',aria:'.__aria'};var Spectrum=(function(){function Spectrumc(entry,snap,singleStep){var index;var ordered=[];this.xPct=[];this.xVal=[];this.xSteps=[];this.xNumSteps=[];this.xHighestCompleteStep=[];this.xSteps=[singleStep||!1];this.xNumSteps=[!1];this.snap=snap;Object.keys(entry).forEach(function(iindex){ordered.push([asArray(entry[iindex]),iindex])});ordered.sort(function(a,b){return a[0][0]-b[0][0]});for(index=0;index<ordered.length;index++){this.handleEntryPoint(ordered[index][1],ordered[index][0])}
this.xNumSteps=this.xSteps.slice(0);for(index=0;index<this.xNumSteps.length;index++){this.handleStepPoint(index,this.xNumSteps[index])}}
Spectrumc.prototype.getDistance=function(value){var index;var distances=[];for(index=0;index<this.xNumSteps.length-1;index++){distances[index]=fromPercentage(this.xVal,value,index)}
return distances};Spectrumc.prototype.getAbsoluteDistance=function(value,distances,direction){var xPct_index=0;var start_factor;var rest_factor=1;var rest_rel_distance;var range_pct=0;var rel_range_distance=0;var abs_distance_counter=0;var range_counter=0;if(value<this.xPct[this.xPct.length-1]){while(value>this.xPct[xPct_index+1]){xPct_index++}}else if(value===this.xPct[this.xPct.length-1]){xPct_index=this.xPct.length-2}
if(!direction&&value===this.xPct[xPct_index+1]){xPct_index++}
if(distances===null){distances=[]}
rest_rel_distance=distances[xPct_index];if(direction){start_factor=(value-this.xPct[xPct_index])/(this.xPct[xPct_index+1]-this.xPct[xPct_index])}else{start_factor=(this.xPct[xPct_index+1]-value)/(this.xPct[xPct_index+1]-this.xPct[xPct_index])}
while(rest_rel_distance>0){range_pct=this.xPct[xPct_index+1+range_counter]-this.xPct[xPct_index+range_counter];if((distances[xPct_index+range_counter]*rest_factor)+100-(start_factor*100)>100){rel_range_distance=range_pct*start_factor;rest_factor=(rest_rel_distance-(100*start_factor))/distances[xPct_index+range_counter];start_factor=1}else{rel_range_distance=((distances[xPct_index+range_counter]*range_pct)/100)*rest_factor;rest_factor=0}
if(direction){abs_distance_counter=abs_distance_counter-rel_range_distance;if(this.xPct.length+range_counter>=1){range_counter--}}else{abs_distance_counter=abs_distance_counter+rel_range_distance;if(this.xPct.length-range_counter>=1){range_counter++}}
rest_rel_distance=distances[xPct_index+range_counter]*rest_factor}
return value+abs_distance_counter};Spectrumc.prototype.toStepping=function(value){value=toStepping(this.xVal,this.xPct,value);return value};Spectrumc.prototype.fromStepping=function(value){return fromStepping(this.xVal,this.xPct,value)};Spectrumc.prototype.getStep=function(value){value=getStep(this.xPct,this.xSteps,this.snap,value);return value};Spectrumc.prototype.getDefaultStep=function(value,isDown,size){var j=getJ(value,this.xPct);if(value===100||(isDown&&value===this.xPct[j-1])){j=Math.max(j-1,1)}
return(this.xVal[j]-this.xVal[j-1])/size};Spectrumc.prototype.getNearbySteps=function(value){var j=getJ(value,this.xPct);return{stepBefore:{startValue:this.xVal[j-2],step:this.xNumSteps[j-2],highestStep:this.xHighestCompleteStep[j-2]},thisStep:{startValue:this.xVal[j-1],step:this.xNumSteps[j-1],highestStep:this.xHighestCompleteStep[j-1]},stepAfter:{startValue:this.xVal[j],step:this.xNumSteps[j],highestStep:this.xHighestCompleteStep[j]}}};Spectrumc.prototype.countStepDecimals=function(){var stepDecimals=this.xNumSteps.map(countDecimals);return Math.max.apply(null,stepDecimals)};Spectrumc.prototype.hasNoSize=function(){return this.xVal[0]===this.xVal[this.xVal.length-1]};Spectrumc.prototype.convert=function(value){return this.getStep(this.toStepping(value))};Spectrumc.prototype.handleEntryPoint=function(index,value){var percentage;var value1;if(index==='min'){percentage=0}else if(index==='max'){percentage=100}else{percentage=parseFloat(index)}
if(!isNumeric(percentage)||!isNumeric(value[0])){throw new Error("noUiSlider: 'range' value isn't numeric.")}
this.xPct.push(percentage);this.xVal.push(value[0]);value1=Number(value[1]);if(!percentage){if(!isNaN(value1)){this.xSteps[0]=value1}}else{this.xSteps.push(isNaN(value1)?!1:value1)}
this.xHighestCompleteStep.push(0)};Spectrumc.prototype.handleStepPoint=function(i,n){var totalSteps;var highestStep;var step;if(!n){return}
if(this.xVal[i]===this.xVal[i+1]){this.xSteps[i]=this.xHighestCompleteStep[i]=this.xVal[i];return}
this.xSteps[i]=fromPercentage([this.xVal[i],this.xVal[i+1]],n,0)/subRangeRatio(this.xPct[i],this.xPct[i+1]);totalSteps=(this.xVal[i+1]-this.xVal[i])/this.xNumSteps[i];highestStep=Math.ceil(Number(totalSteps.toFixed(3))-1);step=this.xVal[i]+(this.xNumSteps[i]*highestStep);this.xHighestCompleteStep[i]=step};return Spectrumc}());exports.PipsMode=void 0;(function(PipsMode){PipsMode.Range='range';PipsMode.Steps='steps';PipsMode.Positions='positions';PipsMode.Count='count';PipsMode.Values='values'}(exports.PipsMode||(exports.PipsMode={})));exports.PipsType=void 0;(function(PipsType){PipsType[PipsType.None=-1]='None';PipsType[PipsType.NoValue=0]='NoValue';PipsType[PipsType.LargeValue=1]='LargeValue';PipsType[PipsType.SmallValue=2]='SmallValue'}(exports.PipsType||(exports.PipsType={})));function isValidFormatter(entry){return isValidPartialFormatter(entry)&&typeof entry.from==='function'}
function isValidPartialFormatter(entry){return typeof entry==='object'&&typeof entry.to==='function'}
function removeElement(el){el.parentElement.removeChild(el)}
function isSet(value){return value!==null&&value!==undefined}
function preventDefault(e){e.preventDefault()}
function unique(array){return array.filter(function(a){return!this[a]?(this[a]=!0):!1},{})}
function closest(value,to){return Math.round(value/to)*to}
function offset(elem,orientation){var rect=elem.getBoundingClientRect();var doc=elem.ownerDocument;var docElem=doc.documentElement;var pageOffset=getPageOffset(doc);if(/webkit.*Chrome.*Mobile/i.test(navigator.userAgent)){pageOffset.x=0}
return orientation?rect.top+pageOffset.y-docElem.clientTop:rect.left+pageOffset.x-docElem.clientLeft}
function isNumeric(a){return typeof a==='number'&&!isNaN(a)&&isFinite(a)}
function addClassFor(element,className,duration){if(duration>0){addClass(element,className);setTimeout(function(){removeClass(element,className)},duration)}}
function limit(a){return Math.max(Math.min(a,100),0)}
function asArray(a){return Array.isArray(a)?a:[a]}
function countDecimals(numStr){var pieces;numStr=String(numStr);pieces=numStr.split('.');return pieces.length>1?pieces[1].length:0}
function addClass(el,className){if(el.classList&&!/\s/.test(className)){el.classList.add(className)}else{el.className+=' '+className}}
function removeClass(el,className){if(el.classList&&!/\s/.test(className)){el.classList.remove(className)}else{el.className=el.className.replace(new RegExp('(^|\\b)'+className.split(' ').join('|')+'(\\b|$)','gi'),' ')}}
function hasClass(el,className){return el.classList?el.classList.contains(className):new RegExp('\\b'+className+'\\b').test(el.className)}
function getPageOffset(doc){var supportPageOffset=window.pageXOffset!==undefined;var isCSS1Compat=(doc.compatMode||'')==='CSS1Compat';var x=supportPageOffset?window.pageXOffset:isCSS1Compat?doc.documentElement.scrollLeft:doc.body.scrollLeft;var y=supportPageOffset?window.pageYOffset:isCSS1Compat?doc.documentElement.scrollTop:doc.body.scrollTop;return{x:x,y:y}}
function getActions(){return window.navigator.pointerEnabled?{start:'pointerdown',move:'pointermove',end:'pointerup'}:window.navigator.msPointerEnabled?{start:'MSPointerDown',move:'MSPointerMove',end:'MSPointerUp'}:{start:'mousedown touchstart',move:'mousemove touchmove',end:'mouseup touchend'}}
function getSupportsPassive(){var supportsPassive=!1;try{var opts=Object.defineProperty({},"passive",{get:function(){supportsPassive=!0},});window.addEventListener("test",null,opts)}catch(e){}
return supportsPassive}
function getSupportsTouchActionNone(){return window.CSS&&CSS.supports&&CSS.supports('touch-action','none')}
function subRangeRatio(pa,pb){return 100/(pb-pa)}
function fromPercentage(range,value,startRange){return(value*100)/(range[startRange+1]-range[startRange])}
function toPercentage(range,value){return fromPercentage(range,range[0]<0?value+Math.abs(range[0]):value-range[0],0)}
function isPercentage(range,value){return((value*(range[1]-range[0]))/100)+range[0]}
function getJ(value,arr){var j=1;while(value>=arr[j]){j+=1}
return j}
function toStepping(xVal,xPct,value){var j;var va;var vb;var pa;var pb;if(value>=xVal.slice(-1)[0]){return 100}
j=getJ(value,xVal);va=xVal[j-1];vb=xVal[j];pa=xPct[j-1];pb=xPct[j];return pa+(toPercentage([va,vb],value)/subRangeRatio(pa,pb))}
function fromStepping(xVal,xPct,value){var j;var va;var vb;var pa;var pb;if(value>=100){return xVal.slice(-1)[0]}
j=getJ(value,xPct);va=xVal[j-1];vb=xVal[j];pa=xPct[j-1];pb=xPct[j];return isPercentage([va,vb],(value-pa)*subRangeRatio(pa,pb))}
function getStep(xPct,xSteps,snap,value){var j;var a;var b;if(value===100){return value}
j=getJ(value,xPct);a=xPct[j-1];b=xPct[j];if(snap){if(value-a>(b-a)/2){return b}
return a}
if(!xSteps[j-1]){return value}
return xPct[j-1]+closest(value-xPct[j-1],xSteps[j-1])}
function testStep(parsed,entry){if(!isNumeric(entry)){throw new Error("noUiSlider: 'step' is not numeric.")}
parsed.singleStep=entry}
function testKeyboardPageMultiplier(parsed,entry){if(!isNumeric(entry)){throw new Error("noUiSlider: 'keyboardPageMultiplier' is not numeric.")}
parsed.keyboardPageMultiplier=entry}
function testKeyboardMultiplier(parsed,entry){if(!isNumeric(entry)){throw new Error("noUiSlider: 'keyboardMultiplier' is not numeric.")}
parsed.keyboardMultiplier=entry}
function testKeyboardDefaultStep(parsed,entry){if(!isNumeric(entry)){throw new Error("noUiSlider: 'keyboardDefaultStep' is not numeric.")}
parsed.keyboardDefaultStep=entry}
function testRange(parsed,entry){if(typeof entry!=='object'||Array.isArray(entry)){throw new Error("noUiSlider: 'range' is not an object.")}
if(entry.min===undefined||entry.max===undefined){throw new Error("noUiSlider: Missing 'min' or 'max' in 'range'.")}
parsed.spectrum=new Spectrum(entry,parsed.snap||!1,parsed.singleStep)}
function testStart(parsed,entry){entry=asArray(entry);if(!Array.isArray(entry)||!entry.length){throw new Error("noUiSlider: 'start' option is incorrect.")}
parsed.handles=entry.length;parsed.start=entry}
function testSnap(parsed,entry){if(typeof entry!=='boolean'){throw new Error("noUiSlider: 'snap' option must be a boolean.")}
parsed.snap=entry}
function testAnimate(parsed,entry){if(typeof entry!=='boolean'){throw new Error("noUiSlider: 'animate' option must be a boolean.")}
parsed.animate=entry}
function testAnimationDuration(parsed,entry){if(typeof entry!=='number'){throw new Error("noUiSlider: 'animationDuration' option must be a number.")}
parsed.animationDuration=entry}
function testConnect(parsed,entry){var connect=[!1];var i;if(entry==='lower'){entry=[!0,!1]}else if(entry==='upper'){entry=[!1,!0]}
if(entry===!0||entry===!1){for(i=1;i<parsed.handles;i++){connect.push(entry)}
connect.push(!1)}else if(!Array.isArray(entry)||!entry.length||entry.length!==parsed.handles+1){throw new Error("noUiSlider: 'connect' option doesn't match handle count.")}else{connect=entry}
parsed.connect=connect}
function testOrientation(parsed,entry){switch(entry){case 'horizontal':parsed.ort=0;break;case 'vertical':parsed.ort=1;break;default:throw new Error("noUiSlider: 'orientation' option is invalid.")}}
function testMargin(parsed,entry){if(!isNumeric(entry)){throw new Error("noUiSlider: 'margin' option must be numeric.")}
if(entry===0){return}
parsed.margin=parsed.spectrum.getDistance(entry)}
function testLimit(parsed,entry){if(!isNumeric(entry)){throw new Error("noUiSlider: 'limit' option must be numeric.")}
parsed.limit=parsed.spectrum.getDistance(entry);if(!parsed.limit||parsed.handles<2){throw new Error("noUiSlider: 'limit' option is only supported on linear sliders with 2 or more handles.")}}
function testPadding(parsed,entry){var index;var totalPadding;var firstValue;var lastValue;if(!isNumeric(entry)&&!Array.isArray(entry)){throw new Error("noUiSlider: 'padding' option must be numeric or array of exactly 2 numbers.")}
if(Array.isArray(entry)&&!(entry.length===2||isNumeric(entry[0])||isNumeric(entry[1]))){throw new Error("noUiSlider: 'padding' option must be numeric or array of exactly 2 numbers.")}
if(entry===0){return}
if(!Array.isArray(entry)){entry=[entry,entry]}
parsed.padding=[parsed.spectrum.getDistance(entry[0]),parsed.spectrum.getDistance(entry[1])];for(index=0;index<parsed.spectrum.xNumSteps.length-1;index++){if(parsed.padding[0][index]<0||parsed.padding[1][index]<0){throw new Error("noUiSlider: 'padding' option must be a positive number(s).")}}
totalPadding=entry[0]+entry[1];firstValue=parsed.spectrum.xVal[0];lastValue=parsed.spectrum.xVal[parsed.spectrum.xVal.length-1];if(totalPadding/(lastValue-firstValue)>1){throw new Error("noUiSlider: 'padding' option must not exceed 100% of the range.")}}
function testDirection(parsed,entry){switch(entry){case 'ltr':parsed.dir=0;break;case 'rtl':parsed.dir=1;break;default:throw new Error("noUiSlider: 'direction' option was not recognized.")}}
function testBehaviour(parsed,entry){var tap;var drag;var fixed;var snap;var hover;var unconstrained;var dragAll;var smoothSteps;if(typeof entry!=='string'){throw new Error("noUiSlider: 'behaviour' must be a string containing options.")}
tap=entry.indexOf('tap')>=0;drag=entry.indexOf('drag')>=0;fixed=entry.indexOf('fixed')>=0;snap=entry.indexOf('snap')>=0;hover=entry.indexOf('hover')>=0;unconstrained=entry.indexOf('unconstrained')>=0;dragAll=entry.indexOf('drag-all')>=0;smoothSteps=entry.indexOf('smooth-steps')>=0;if(fixed){if(parsed.handles!==2){throw new Error("noUiSlider: 'fixed' behaviour must be used with 2 handles")}
testMargin(parsed,parsed.start[1]-parsed.start[0])}
if(unconstrained&&(parsed.margin||parsed.limit)){throw new Error("noUiSlider: 'unconstrained' behaviour cannot be used with margin or limit")}
parsed.events={tap:tap||snap,drag:drag,dragAll:dragAll,smoothSteps:smoothSteps,fixed:fixed,snap:snap,hover:hover,unconstrained:unconstrained}}
function testTooltips(parsed,entry){var i;if(entry===!1){return}
if(entry===!0||isValidPartialFormatter(entry)){parsed.tooltips=[];for(i=0;i<parsed.handles;i++){parsed.tooltips.push(entry)}}else{entry=asArray(entry);if(entry.length!==parsed.handles){throw new Error('noUiSlider: must pass a formatter for all handles.')}
entry.forEach(function(formatter){if(typeof formatter!=='boolean'&&!isValidPartialFormatter(formatter)){throw new Error("noUiSlider: 'tooltips' must be passed a formatter or 'false'.")}});parsed.tooltips=entry}}
function testHandleAttributes(parsed,entry){if(entry.length!==parsed.handles){throw new Error('noUiSlider: must pass a attributes for all handles.')}
parsed.handleAttributes=entry}
function testAriaFormat(parsed,entry){if(!isValidPartialFormatter(entry)){throw new Error("noUiSlider: 'ariaFormat' requires 'to' method.")}
parsed.ariaFormat=entry}
function testFormat(parsed,entry){if(!isValidFormatter(entry)){throw new Error("noUiSlider: 'format' requires 'to' and 'from' methods.")}
parsed.format=entry}
function testKeyboardSupport(parsed,entry){if(typeof entry!=='boolean'){throw new Error("noUiSlider: 'keyboardSupport' option must be a boolean.")}
parsed.keyboardSupport=entry}
function testDocumentElement(parsed,entry){parsed.documentElement=entry}
function testCssPrefix(parsed,entry){if(typeof entry!=='string'&&entry!==!1){throw new Error("noUiSlider: 'cssPrefix' must be a string or `false`.")}
parsed.cssPrefix=entry}
function testCssClasses(parsed,entry){if(typeof entry!=='object'){throw new Error("noUiSlider: 'cssClasses' must be an object.")}
if(typeof parsed.cssPrefix==='string'){parsed.cssClasses={};Object.keys(entry).forEach(function(key){parsed.cssClasses[key]=parsed.cssPrefix+entry[key]})}else{parsed.cssClasses=entry}}
function testOptions(options){var parsed={margin:null,limit:null,padding:null,animate:!0,animationDuration:300,ariaFormat:defaultFormatter,format:defaultFormatter};var tests={step:{r:!1,t:testStep},keyboardPageMultiplier:{r:!1,t:testKeyboardPageMultiplier},keyboardMultiplier:{r:!1,t:testKeyboardMultiplier},keyboardDefaultStep:{r:!1,t:testKeyboardDefaultStep},start:{r:!0,t:testStart},connect:{r:!0,t:testConnect},direction:{r:!0,t:testDirection},snap:{r:!1,t:testSnap},animate:{r:!1,t:testAnimate},animationDuration:{r:!1,t:testAnimationDuration},range:{r:!0,t:testRange},orientation:{r:!1,t:testOrientation},margin:{r:!1,t:testMargin},limit:{r:!1,t:testLimit},padding:{r:!1,t:testPadding},behaviour:{r:!0,t:testBehaviour},ariaFormat:{r:!1,t:testAriaFormat},format:{r:!1,t:testFormat},tooltips:{r:!1,t:testTooltips},keyboardSupport:{r:!0,t:testKeyboardSupport},documentElement:{r:!1,t:testDocumentElement},cssPrefix:{r:!0,t:testCssPrefix},cssClasses:{r:!0,t:testCssClasses},handleAttributes:{r:!1,t:testHandleAttributes}};var defaults={connect:!1,direction:'ltr',behaviour:'tap',orientation:'horizontal',keyboardSupport:!0,cssPrefix:'noui-',cssClasses:cssClasses,keyboardPageMultiplier:5,keyboardMultiplier:1,keyboardDefaultStep:10};var d;var msPrefix;var noPrefix;var styles;if(options.format&&!options.ariaFormat){options.ariaFormat=options.format}
Object.keys(tests).forEach(function(name){if(!isSet(options[name])&&defaults[name]===undefined){if(tests[name].r){throw new Error("noUiSlider: '"+name+"' is required.")}
return}
tests[name].t(parsed,!isSet(options[name])?defaults[name]:options[name])});parsed.pips=options.pips;d=document.createElement('div');msPrefix=d.style.msTransform!==undefined;noPrefix=d.style.transform!==undefined;parsed.transformRule=noPrefix?'transform':msPrefix?'msTransform':'webkitTransform';styles=[['left','top'],['right','bottom']];parsed.style=styles[parsed.dir][parsed.ort];return parsed}
function scope(target,options,originalOptions){var actions=getActions();var supportsTouchActionNone=getSupportsTouchActionNone();var supportsPassive=supportsTouchActionNone&&getSupportsPassive();var scope_Target=target;var scope_Base;var scope_Handles;var scope_Connects;var scope_Pips;var scope_Tooltips;var scope_Spectrum=options.spectrum;var scope_Values=[];var scope_Locations=[];var scope_HandleNumbers=[];var scope_ActiveHandlesCount=0;var scope_Events={};var scope_Document=target.ownerDocument;var scope_DocumentElement=options.documentElement||scope_Document.documentElement;var scope_Body=scope_Document.body;var scope_DirOffset=scope_Document.dir==='rtl'||options.ort===1?0:100;var scope_Self;function addNodeTo(addTarget,className){var div=scope_Document.createElement('div');if(className){addClass(div,className)}
addTarget.appendChild(div);return div}
function addOrigin(base,handleNumber){var origin=addNodeTo(base,options.cssClasses.origin);var handle=addNodeTo(origin,options.cssClasses.handle);var attributes_1;addNodeTo(handle,options.cssClasses.touchArea);handle.setAttribute('data-handle',String(handleNumber));if(options.keyboardSupport){handle.setAttribute('tabindex','0');handle.addEventListener('keydown',function(event){return eventKeydown(event,handleNumber)})}
if(options.handleAttributes!==undefined){attributes_1=options.handleAttributes[handleNumber];Object.keys(attributes_1).forEach(function(attribute){handle.setAttribute(attribute,attributes_1[attribute])})}
handle.setAttribute('role','slider');handle.setAttribute('aria-orientation',options.ort?'vertical':'horizontal');if(handleNumber===0){addClass(handle,options.cssClasses.handleLower)}else if(handleNumber===options.handles-1){addClass(handle,options.cssClasses.handleUpper)}
origin.handle=handle;return origin}
function addConnect(base,add){if(!add){return!1}
return addNodeTo(base,options.cssClasses.connect)}
function addElements(connectOptions,base){var connectBase=addNodeTo(base,options.cssClasses.connects);var i;scope_Handles=[];scope_Connects=[];scope_Connects.push(addConnect(connectBase,connectOptions[0]));for(i=0;i<options.handles;i++){scope_Handles.push(addOrigin(base,i));scope_HandleNumbers[i]=i;scope_Connects.push(addConnect(connectBase,connectOptions[i+1]))}}
function addSlider(addTarget){var textDirection;addClass(addTarget,options.cssClasses.target);if(options.dir===0){addClass(addTarget,options.cssClasses.ltr)}else{addClass(addTarget,options.cssClasses.rtl)}
if(options.ort===0){addClass(addTarget,options.cssClasses.horizontal)}else{addClass(addTarget,options.cssClasses.vertical)}
textDirection=getComputedStyle(addTarget).direction;if(textDirection==='rtl'){addClass(addTarget,options.cssClasses.textDirectionRtl)}else{addClass(addTarget,options.cssClasses.textDirectionLtr)}
return addNodeTo(addTarget,options.cssClasses.base)}
function addTooltip(handle,handleNumber){if(!options.tooltips||!options.tooltips[handleNumber]){return!1}
return addNodeTo(handle.firstChild,options.cssClasses.tooltip)}
function isSliderDisabled(){return scope_Target.hasAttribute('disabled')}
function isHandleDisabled(handleNumber){var handleOrigin=scope_Handles[handleNumber];return handleOrigin.hasAttribute('disabled')}
function disable(handleNumber){if(handleNumber!==null&&handleNumber!==undefined){scope_Handles[handleNumber].setAttribute('disabled','');scope_Handles[handleNumber].handle.removeAttribute('tabindex')}else{scope_Target.setAttribute('disabled','');scope_Handles.forEach(function(handle){handle.handle.removeAttribute('tabindex')})}}
function enable(handleNumber){if(handleNumber!==null&&handleNumber!==undefined){scope_Handles[handleNumber].removeAttribute('disabled');scope_Handles[handleNumber].handle.setAttribute('tabindex','0')}else{scope_Target.removeAttribute('disabled');scope_Handles.forEach(function(handle){handle.removeAttribute('disabled');handle.handle.setAttribute('tabindex','0')})}}
function removeTooltips(){if(scope_Tooltips){removeEvent('update'+INTERNAL_EVENT_NS.tooltips);scope_Tooltips.forEach(function(tooltip){if(tooltip){removeElement(tooltip)}});scope_Tooltips=null}}
function tooltips(){var formattedValue;removeTooltips();scope_Tooltips=scope_Handles.map(addTooltip);bindEvent('update'+INTERNAL_EVENT_NS.tooltips,function(values,handleNumber,unencoded){if(!scope_Tooltips||!options.tooltips){return}
if(scope_Tooltips[handleNumber]===!1){return}
formattedValue=values[handleNumber];if(options.tooltips[handleNumber]!==!0){formattedValue=options.tooltips[handleNumber].to(unencoded[handleNumber])}
scope_Tooltips[handleNumber].innerHTML=formattedValue})}
function aria(){removeEvent('update'+INTERNAL_EVENT_NS.aria);bindEvent('update'+INTERNAL_EVENT_NS.aria,function(values,handleNumber,unencoded,tap,positions){scope_HandleNumbers.forEach(function(index){var handle=scope_Handles[index];var min=checkHandlePosition(scope_Locations,index,0,!0,!0,!0);var max=checkHandlePosition(scope_Locations,index,100,!0,!0,!0);var now=positions[index];var text=String(options.ariaFormat.to(unencoded[index]));min=scope_Spectrum.fromStepping(min).toFixed(1);max=scope_Spectrum.fromStepping(max).toFixed(1);now=scope_Spectrum.fromStepping(now).toFixed(1);handle.children[0].setAttribute('aria-valuemin',min);handle.children[0].setAttribute('aria-valuemax',max);handle.children[0].setAttribute('aria-valuenow',now);handle.children[0].setAttribute('aria-valuetext',text)})})}
function getGroup(ipips){var interval;var spread;var values;if(ipips.mode===exports.PipsMode.Range||ipips.mode===exports.PipsMode.Steps){return scope_Spectrum.xVal}
if(ipips.mode===exports.PipsMode.Count){if(ipips.values<2){throw new Error("noUiSlider: 'values' (>= 2) required for mode 'count'.")}
interval=ipips.values-1;spread=100/interval;values=[];while(interval--){values[interval]=interval*spread}
values.push(100);return mapToRange(values,ipips.stepped)}
if(ipips.mode===exports.PipsMode.Positions){return mapToRange(ipips.values,ipips.stepped)}
if(ipips.mode===exports.PipsMode.Values){if(ipips.stepped){return ipips.values.map(function(value){return scope_Spectrum.fromStepping(scope_Spectrum.getStep(scope_Spectrum.toStepping(value)))})}
return ipips.values}
return[]}
function mapToRange(values,stepped){return values.map(function(value){return scope_Spectrum.fromStepping(stepped?scope_Spectrum.getStep(value):value)})}
function generateSpread(ipips){var group=getGroup(ipips);var indexes={};var firstInRange=scope_Spectrum.xVal[0];var lastInRange=scope_Spectrum.xVal[scope_Spectrum.xVal.length-1];var ignoreFirst=!1;var ignoreLast=!1;var prevPct=0;function safeIncrement(value,increment){return Number((value+increment).toFixed(7))}
group=unique(group.slice().sort(function(a,b){return a-b}));if(group[0]!==firstInRange){group.unshift(firstInRange);ignoreFirst=!0}
if(group[group.length-1]!==lastInRange){group.push(lastInRange);ignoreLast=!0}
group.forEach(function(current,index){var step;var i;var q;var low=current;var high=group[index+1];var newPct;var pctDifference;var pctPos;var type;var steps;var realSteps;var stepSize;var isSteps=ipips.mode===exports.PipsMode.Steps;if(isSteps){step=scope_Spectrum.xNumSteps[index]}
if(!step){step=high-low}
if(high===undefined){high=low}
step=Math.max(step,0.0000001);for(i=low;i<=high;i=safeIncrement(i,step)){newPct=scope_Spectrum.toStepping(i);pctDifference=newPct-prevPct;steps=pctDifference/(ipips.density||1);realSteps=Math.round(steps);stepSize=pctDifference/realSteps;for(q=1;q<=realSteps;q+=1){pctPos=prevPct+(q*stepSize);indexes[pctPos.toFixed(5)]=[scope_Spectrum.fromStepping(pctPos),0]}
type=group.indexOf(i)>-1?exports.PipsType.LargeValue:isSteps?exports.PipsType.SmallValue:exports.PipsType.NoValue;if(!index&&ignoreFirst&&i!==high){type=0}
if(!(i===high&&ignoreLast)){indexes[newPct.toFixed(5)]=[i,type]}
prevPct=newPct}});return indexes}
function addMarking(spread,filterFunc,formatter){var _a,_b;var element=scope_Document.createElement('div');var valueSizeClasses=(_a={},_a[exports.PipsType.None]='',_a[exports.PipsType.NoValue]=options.cssClasses.valueNormal,_a[exports.PipsType.LargeValue]=options.cssClasses.valueLarge,_a[exports.PipsType.SmallValue]=options.cssClasses.valueSub,_a);var markerSizeClasses=(_b={},_b[exports.PipsType.None]='',_b[exports.PipsType.NoValue]=options.cssClasses.markerNormal,_b[exports.PipsType.LargeValue]=options.cssClasses.markerLarge,_b[exports.PipsType.SmallValue]=options.cssClasses.markerSub,_b);var valueOrientationClasses=[options.cssClasses.valueHorizontal,options.cssClasses.valueVertical];var markerOrientationClasses=[options.cssClasses.markerHorizontal,options.cssClasses.markerVertical];addClass(element,options.cssClasses.pips);addClass(element,options.ort===0?options.cssClasses.pipsHorizontal:options.cssClasses.pipsVertical);function getClasses(type,source){var a=source===options.cssClasses.value;var orientationClasses=a?valueOrientationClasses:markerOrientationClasses;var sizeClasses=a?valueSizeClasses:markerSizeClasses;return source+' '+orientationClasses[options.ort]+' '+sizeClasses[type]}
function addSpread(key,value,type){var node;type=filterFunc?filterFunc(value,type):type;if(type===exports.PipsType.None){return}
node=addNodeTo(element,!1);node.className=getClasses(type,options.cssClasses.marker);node.style[options.style]=key+'%';if(type>exports.PipsType.NoValue){node=addNodeTo(element,!1);node.className=getClasses(type,options.cssClasses.value);node.setAttribute('data-value',String(value));node.style[options.style]=key+'%';node.innerHTML=String(formatter.to(value))}}
Object.keys(spread).forEach(function(key){addSpread(key,spread[key][0],spread[key][1])});return element}
function removePips(){if(scope_Pips){removeElement(scope_Pips);scope_Pips=null}}
function pips(ipips){var filter;var spread;var format;removePips();spread=generateSpread(ipips);filter=ipips.filter;format=ipips.format||{to:function(value){return String(Math.round(value))}};scope_Pips=scope_Target.appendChild(addMarking(spread,filter,format));return scope_Pips}
function baseSize(){var rect=scope_Base.getBoundingClientRect();var alt=('offset'+['Width','Height'][options.ort]);return options.ort===0?rect.width||scope_Base[alt]:rect.height||scope_Base[alt]}
function attachEvent(events,element,callback,data){var method=function(event){var e=fixEvent(event,data.pageOffset,data.target||element);if(!e){return!1}
if(isSliderDisabled()&&!data.doNotReject){return!1}
if(hasClass(scope_Target,options.cssClasses.tap)&&!data.doNotReject){return!1}
if(events===actions.start&&e.buttons!==undefined&&e.buttons>1){return!1}
if(data.hover&&e.buttons){return!1}
if(!supportsPassive){e.preventDefault()}
e.calcPoint=e.points[options.ort];callback(e,data)};var methods=[];events.split(' ').forEach(function(eventName){element.addEventListener(eventName,method,supportsPassive?{passive:!0}:!1);methods.push([eventName,method])});return methods}
function fixEvent(e,pageOffset,eventTarget){var touch=e.type.indexOf('touch')===0;var mouse=e.type.indexOf('mouse')===0;var pointer=e.type.indexOf('pointer')===0;var x=0;var y=0;var isTouchOnTarget;var targetTouches;var targetTouch;if(e.type.indexOf('MSPointer')===0){pointer=!0}
if(e.type==='mousedown'&&!e.buttons&&!e.touches){return!1}
if(touch){isTouchOnTarget=function(checkTouch){return(checkTouch.target===eventTarget||eventTarget.contains(checkTouch.target)||(e.composed&&e.composedPath().shift()===eventTarget))};if(e.type==='touchstart'){targetTouches=Array.prototype.filter.call(e.touches,isTouchOnTarget);if(targetTouches.length>1){return!1}
x=targetTouches[0].pageX;y=targetTouches[0].pageY}else{targetTouch=Array.prototype.find.call(e.changedTouches,isTouchOnTarget);if(!targetTouch){return!1}
x=targetTouch.pageX;y=targetTouch.pageY}}
pageOffset=pageOffset||getPageOffset(scope_Document);if(mouse||pointer){x=e.clientX+pageOffset.x;y=e.clientY+pageOffset.y}
e.pageOffset=pageOffset;e.points=[x,y];e.cursor=mouse||pointer;return e}
function calcPointToPercentage(calcPoint){var location=calcPoint-offset(scope_Base,options.ort);var proposal=(location*100)/baseSize();proposal=limit(proposal);return options.dir?100-proposal:proposal}
function getClosestHandle(clickedPosition){var smallestDifference=100;var handleNumber=!1;scope_Handles.forEach(function(handle,index){var handlePosition;var differenceWithThisHandle;var clickAtEdge;var isCloser;var isCloserAfter;if(isHandleDisabled(index)){return}
handlePosition=scope_Locations[index];differenceWithThisHandle=Math.abs(handlePosition-clickedPosition);clickAtEdge=differenceWithThisHandle===100&&smallestDifference===100;isCloser=differenceWithThisHandle<smallestDifference;isCloserAfter=differenceWithThisHandle<=smallestDifference&&clickedPosition>handlePosition;if(isCloser||isCloserAfter||clickAtEdge){handleNumber=index;smallestDifference=differenceWithThisHandle}});return handleNumber}
function documentLeave(event,data){if(event.type==='mouseout'&&event.target.nodeName==='HTML'&&event.relatedTarget===null){eventEnd(event,data)}}
function eventMove(event,data){var movement;var proposal;if(navigator.appVersion.indexOf('MSIE 9')===-1&&event.buttons===0&&data.buttonsProperty!==0){return eventEnd(event,data)}
movement=(options.dir?-1:1)*(event.calcPoint-data.startCalcPoint);proposal=(movement*100)/data.baseSize;moveHandles(movement>0,proposal,data.locations,data.handleNumbers,data.connect)}
function eventEnd(event,data){if(data.handle){removeClass(data.handle,options.cssClasses.active);scope_ActiveHandlesCount-=1}
data.listeners.forEach(function(c){scope_DocumentElement.removeEventListener(c[0],c[1])});if(scope_ActiveHandlesCount===0){removeClass(scope_Target,options.cssClasses.drag);setZindex();if(event.cursor){scope_Body.style.cursor='';scope_Body.removeEventListener('selectstart',preventDefault)}}
if(options.events.smoothSteps){data.handleNumbers.forEach(function(handleNumber){setHandle(handleNumber,scope_Locations[handleNumber],!0,!0,!1,!1)});data.handleNumbers.forEach(function(handleNumber){fireEvent('update',handleNumber)})}
data.handleNumbers.forEach(function(handleNumber){fireEvent('change',handleNumber);fireEvent('set',handleNumber);fireEvent('end',handleNumber)})}
function eventStart(event,data){var handle;var handleOrigin;var listeners;var moveEvent;var endEvent;var outEvent;if(data.handleNumbers.some(isHandleDisabled)){return}
if(data.handleNumbers.length===1){handleOrigin=scope_Handles[data.handleNumbers[0]];handle=handleOrigin.children[0];scope_ActiveHandlesCount+=1;addClass(handle,options.cssClasses.active)}
event.stopPropagation();listeners=[];moveEvent=attachEvent(actions.move,scope_DocumentElement,eventMove,{target:event.target,handle:handle,connect:data.connect,listeners:listeners,startCalcPoint:event.calcPoint,baseSize:baseSize(),pageOffset:event.pageOffset,handleNumbers:data.handleNumbers,buttonsProperty:event.buttons,locations:scope_Locations.slice()});endEvent=attachEvent(actions.end,scope_DocumentElement,eventEnd,{target:event.target,handle:handle,listeners:listeners,doNotReject:!0,handleNumbers:data.handleNumbers});outEvent=attachEvent('mouseout',scope_DocumentElement,documentLeave,{target:event.target,handle:handle,listeners:listeners,doNotReject:!0,handleNumbers:data.handleNumbers});listeners.push.apply(listeners,moveEvent.concat(endEvent,outEvent));if(event.cursor){scope_Body.style.cursor=getComputedStyle(event.target).cursor;if(scope_Handles.length>1){addClass(scope_Target,options.cssClasses.drag)}
scope_Body.addEventListener('selectstart',preventDefault,!1)}
data.handleNumbers.forEach(function(handleNumber){fireEvent('start',handleNumber)})}
function eventTap(event){var proposal;var handleNumber;event.stopPropagation();proposal=calcPointToPercentage(event.calcPoint);handleNumber=getClosestHandle(proposal);if(handleNumber===!1){return}
if(!options.events.snap){addClassFor(scope_Target,options.cssClasses.tap,options.animationDuration)}
setHandle(handleNumber,proposal,!0,!0);setZindex();fireEvent('slide',handleNumber,!0);fireEvent('update',handleNumber,!0);if(!options.events.snap){fireEvent('change',handleNumber,!0);fireEvent('set',handleNumber,!0)}else{eventStart(event,{handleNumbers:[handleNumber]})}}
function eventHover(event){var proposal=calcPointToPercentage(event.calcPoint);var to=scope_Spectrum.getStep(proposal);var value=scope_Spectrum.fromStepping(to);Object.keys(scope_Events).forEach(function(targetEvent){if('hover'===targetEvent.split('.')[0]){scope_Events[targetEvent].forEach(function(callback){callback.call(scope_Self,value)})}})}
function eventKeydown(event,handleNumber){var horizontalKeys;var verticalKeys;var largeStepKeys;var edgeKeys;var key;var isLargeDown;var isLargeUp;var isDown;var isUp;var isMin;var isMax;var to;var direction;var steps;var step;if(isSliderDisabled()||isHandleDisabled(handleNumber)){return!1}
horizontalKeys=['Left','Right'];verticalKeys=['Down','Up'];largeStepKeys=['PageDown','PageUp'];edgeKeys=['Home','End'];if(options.dir&&!options.ort){horizontalKeys.reverse()}else if(options.ort&&!options.dir){verticalKeys.reverse();largeStepKeys.reverse()}
key=event.key.replace('Arrow','');isLargeDown=key===largeStepKeys[0];isLargeUp=key===largeStepKeys[1];isDown=key===verticalKeys[0]||key===horizontalKeys[0]||isLargeDown;isUp=key===verticalKeys[1]||key===horizontalKeys[1]||isLargeUp;isMin=key===edgeKeys[0];isMax=key===edgeKeys[1];if(!isDown&&!isUp&&!isMin&&!isMax){return!0}
event.preventDefault();if(isUp||isDown){direction=isDown?0:1;steps=getNextStepsForHandle(handleNumber);step=steps[direction];if(step===null){return!1}
if(step===!1){step=scope_Spectrum.getDefaultStep(scope_Locations[handleNumber],isDown,options.keyboardDefaultStep)}
if(isLargeUp||isLargeDown){step*=options.keyboardPageMultiplier}else{step*=options.keyboardMultiplier}
step=Math.max(step,0.0000001);step=(isDown?-1:1)*step;to=scope_Values[handleNumber]+step}else if(isMax){to=options.spectrum.xVal[options.spectrum.xVal.length-1]}else{to=options.spectrum.xVal[0]}
setHandle(handleNumber,scope_Spectrum.toStepping(to),!0,!0);fireEvent('slide',handleNumber);fireEvent('update',handleNumber);fireEvent('change',handleNumber);fireEvent('set',handleNumber);return!1}
function bindSliderEvents(behaviour){var handleBefore;var handleAfter;var eventHolders;var handlesToDrag;var handleNumbersToDrag;if(!behaviour.fixed){scope_Handles.forEach(function(handle,index){attachEvent(actions.start,handle.children[0],eventStart,{handleNumbers:[index]})})}
if(behaviour.tap){attachEvent(actions.start,scope_Base,eventTap,{})}
if(behaviour.hover){attachEvent(actions.move,scope_Base,eventHover,{hover:!0})}
if(behaviour.drag){scope_Connects.forEach(function(connect,index){if(connect===!1||index===0||index===scope_Connects.length-1){return}
handleBefore=scope_Handles[index-1];handleAfter=scope_Handles[index];eventHolders=[connect];handlesToDrag=[handleBefore,handleAfter];handleNumbersToDrag=[index-1,index];addClass(connect,options.cssClasses.draggable);if(behaviour.fixed){eventHolders.push(handleBefore.children[0]);eventHolders.push(handleAfter.children[0])}
if(behaviour.dragAll){handlesToDrag=scope_Handles;handleNumbersToDrag=scope_HandleNumbers}
eventHolders.forEach(function(eventHolder){attachEvent(actions.start,eventHolder,eventStart,{handles:handlesToDrag,handleNumbers:handleNumbersToDrag,connect:connect})})})}}
function bindEvent(namespacedEvent,callback){scope_Events[namespacedEvent]=scope_Events[namespacedEvent]||[];scope_Events[namespacedEvent].push(callback);if(namespacedEvent.split('.')[0]==='update'){scope_Handles.forEach(function(a,index){fireEvent('update',index)})}}
function isInternalNamespace(namespace){return namespace===INTERNAL_EVENT_NS.aria||namespace===INTERNAL_EVENT_NS.tooltips}
function removeEvent(namespacedEvent){var event=namespacedEvent&&namespacedEvent.split('.')[0];var namespace=event?namespacedEvent.substring(event.length):namespacedEvent;Object.keys(scope_Events).forEach(function(bind){var tEvent=bind.split('.')[0];var tNamespace=bind.substring(tEvent.length);if((!event||event===tEvent)&&(!namespace||namespace===tNamespace)){if(!isInternalNamespace(tNamespace)||namespace===tNamespace){delete scope_Events[bind]}}})}
function fireEvent(eventName,handleNumber,tap){Object.keys(scope_Events).forEach(function(targetEvent){var eventType=targetEvent.split('.')[0];if(eventName===eventType){scope_Events[targetEvent].forEach(function(callback){callback.call(scope_Self,scope_Values.map(options.format.to),handleNumber,scope_Values.slice(),tap||!1,scope_Locations.slice(),scope_Self)})}})}
function checkHandlePosition(reference,handleNumber,to,lookBackward,lookForward,getValue,smoothSteps){var distance;if(scope_Handles.length>1&&!options.events.unconstrained){if(lookBackward&&handleNumber>0){distance=scope_Spectrum.getAbsoluteDistance(reference[handleNumber-1],options.margin,!1);to=Math.max(to,distance)}
if(lookForward&&handleNumber<scope_Handles.length-1){distance=scope_Spectrum.getAbsoluteDistance(reference[handleNumber+1],options.margin,!0);to=Math.min(to,distance)}}
if(scope_Handles.length>1&&options.limit){if(lookBackward&&handleNumber>0){distance=scope_Spectrum.getAbsoluteDistance(reference[handleNumber-1],options.limit,!1);to=Math.min(to,distance)}
if(lookForward&&handleNumber<scope_Handles.length-1){distance=scope_Spectrum.getAbsoluteDistance(reference[handleNumber+1],options.limit,!0);to=Math.max(to,distance)}}
if(options.padding){if(handleNumber===0){distance=scope_Spectrum.getAbsoluteDistance(0,options.padding[0],!1);to=Math.max(to,distance)}
if(handleNumber===scope_Handles.length-1){distance=scope_Spectrum.getAbsoluteDistance(100,options.padding[1],!0);to=Math.min(to,distance)}}
if(!smoothSteps){to=scope_Spectrum.getStep(to)}
to=limit(to);if(to===reference[handleNumber]&&!getValue){return!1}
return to}
function inRuleOrder(v,a){var o=options.ort;return(o?a:v)+', '+(o?v:a)}
function moveHandles(upward,proposal,locations,handleNumbers,connect){var proposals=locations.slice();var firstHandle=handleNumbers[0];var smoothSteps=options.events.smoothSteps;var b=[!upward,upward];var f=[upward,!upward];var state=!1;handleNumbers=handleNumbers.slice();if(upward){handleNumbers.reverse()}
if(handleNumbers.length>1){handleNumbers.forEach(function(handleNumber,o){var to=checkHandlePosition(proposals,handleNumber,proposals[handleNumber]+proposal,b[o],f[o],!1,smoothSteps);if(to===!1){proposal=0}else{proposal=to-proposals[handleNumber];proposals[handleNumber]=to}})}else{b=f=[!0]}
handleNumbers.forEach(function(handleNumber,o){state=setHandle(handleNumber,locations[handleNumber]+proposal,b[o],f[o],!1,smoothSteps)||state});if(state){handleNumbers.forEach(function(handleNumber){fireEvent('update',handleNumber);fireEvent('slide',handleNumber)});if(connect!==undefined){fireEvent('drag',firstHandle)}}}
function transformDirection(a,b){return options.dir?100-a-b:a}
function updateHandlePosition(handleNumber,to){var translation;var translateRule;scope_Locations[handleNumber]=to;scope_Values[handleNumber]=scope_Spectrum.fromStepping(to);translation=transformDirection(to,0)-scope_DirOffset;translateRule='translate('+inRuleOrder(translation+'%','0')+')';scope_Handles[handleNumber].style[options.transformRule]=translateRule;updateConnect(handleNumber);updateConnect(handleNumber+1)}
function setZindex(){scope_HandleNumbers.forEach(function(handleNumber){var dir=scope_Locations[handleNumber]>50?-1:1;var zIndex=3+(scope_Handles.length+(dir*handleNumber));scope_Handles[handleNumber].style.zIndex=String(zIndex)})}
function setHandle(handleNumber,to,lookBackward,lookForward,exactInput,smoothSteps){if(!exactInput){to=checkHandlePosition(scope_Locations,handleNumber,to,lookBackward,lookForward,!1,smoothSteps)}
if(to===!1){return!1}
updateHandlePosition(handleNumber,to);return!0}
function updateConnect(index){var l;var h;var connectWidth;var translateRule;var scaleRule;if(!scope_Connects[index]){return}
l=0;h=100;if(index!==0){l=scope_Locations[index-1]}
if(index!==scope_Connects.length-1){h=scope_Locations[index]}
connectWidth=h-l;translateRule='translate('+inRuleOrder(transformDirection(l,connectWidth)+'%','0')+')';scaleRule='scale('+inRuleOrder(connectWidth/100,'1')+')';scope_Connects[index].style[options.transformRule]=translateRule+' '+scaleRule}
function resolveToValue(to,handleNumber){if(to===null||to===!1||to===undefined){return scope_Locations[handleNumber]}
if(typeof to==='number'){to=String(to)}
to=options.format.from(to);if(to!==!1){to=scope_Spectrum.toStepping(to)}
if(to===!1||isNaN(to)){return scope_Locations[handleNumber]}
return to}
function scope_HandleNumbersCallback(exactInput){return function(handleNumber){setHandle(handleNumber,scope_Locations[handleNumber],!0,!0,exactInput)}}
function valueSet(input,fireSetEvent,exactInput){var values=asArray(input);var isInit=scope_Locations[0]===undefined;var i;var space_1;fireSetEvent=fireSetEvent===undefined?!0:fireSetEvent;if(options.animate&&!isInit){addClassFor(scope_Target,options.cssClasses.tap,options.animationDuration)}
scope_HandleNumbers.forEach(function(handleNumber){setHandle(handleNumber,resolveToValue(values[handleNumber],handleNumber),!0,!1,exactInput)});i=scope_HandleNumbers.length===1?0:1;if(isInit&&scope_Spectrum.hasNoSize()){exactInput=!0;scope_Locations[0]=0;if(scope_HandleNumbers.length>1){space_1=100/(scope_HandleNumbers.length-1);scope_HandleNumbers.forEach(function(handleNumber){scope_Locations[handleNumber]=handleNumber*space_1})}}
for(;i<scope_HandleNumbers.length;++i){scope_HandleNumbers.forEach(scope_HandleNumbersCallback(exactInput))}
setZindex();scope_HandleNumbers.forEach(function(handleNumber){fireEvent('update',handleNumber);if(values[handleNumber]!==null&&fireSetEvent){fireEvent('set',handleNumber)}})}
function valueReset(fireSetEvent){valueSet(options.start,fireSetEvent)}
function valueSetHandle(handleNumber,value,fireSetEvent,exactInput){handleNumber=Number(handleNumber);if(!(handleNumber>=0&&handleNumber<scope_HandleNumbers.length)){throw new Error('noUiSlider: invalid handle number, got: '+handleNumber)}
setHandle(handleNumber,resolveToValue(value,handleNumber),!0,!0,exactInput);fireEvent('update',handleNumber);if(fireSetEvent){fireEvent('set',handleNumber)}}
function valueGet(unencoded){var values;if(unencoded===void 0){unencoded=!1}
if(unencoded){return scope_Values.length===1?scope_Values[0]:scope_Values.slice(0)}
values=scope_Values.map(options.format.to);if(values.length===1){return values[0]}
return values}
function destroy(){removeEvent(INTERNAL_EVENT_NS.aria);removeEvent(INTERNAL_EVENT_NS.tooltips);Object.keys(options.cssClasses).forEach(function(key){removeClass(scope_Target,options.cssClasses[key])});while(scope_Target.firstChild){scope_Target.removeChild(scope_Target.firstChild)}
delete scope_Target.noUiSlider}
function getNextStepsForHandle(handleNumber){var location=scope_Locations[handleNumber];var nearbySteps=scope_Spectrum.getNearbySteps(location);var value=scope_Values[handleNumber];var increment=nearbySteps.thisStep.step;var decrement=null;var stepDecimals;if(options.snap){return[value-nearbySteps.stepBefore.startValue||null,nearbySteps.stepAfter.startValue-value||null]}
if(increment!==!1){if(value+increment>nearbySteps.stepAfter.startValue){increment=nearbySteps.stepAfter.startValue-value}}
if(value>nearbySteps.thisStep.startValue){decrement=nearbySteps.thisStep.step}else if(nearbySteps.stepBefore.step===!1){decrement=!1}else{decrement=value-nearbySteps.stepBefore.highestStep}
if(location===100){increment=null}else if(location===0){decrement=null}
stepDecimals=scope_Spectrum.countStepDecimals();if(increment!==null&&increment!==!1){increment=Number(increment.toFixed(stepDecimals))}
if(decrement!==null&&decrement!==!1){decrement=Number(decrement.toFixed(stepDecimals))}
return[decrement,increment]}
function getNextSteps(){return scope_HandleNumbers.map(getNextStepsForHandle)}
function updateOptions(optionsToUpdate,fireSetEvent){var v=valueGet();var updateAble=['margin','limit','padding','range','animate','snap','step','format','pips','tooltips'];var newOptions;updateAble.forEach(function(name){if(optionsToUpdate[name]!==undefined){originalOptions[name]=optionsToUpdate[name]}});newOptions=testOptions(originalOptions);updateAble.forEach(function(name){if(optionsToUpdate[name]!==undefined){options[name]=newOptions[name]}});scope_Spectrum=newOptions.spectrum;options.margin=newOptions.margin;options.limit=newOptions.limit;options.padding=newOptions.padding;if(options.pips){pips(options.pips)}else{removePips()}
if(options.tooltips){tooltips()}else{removeTooltips()}
scope_Locations=[];valueSet(isSet(optionsToUpdate.start)?optionsToUpdate.start:v,fireSetEvent)}
function setupSlider(){scope_Base=addSlider(scope_Target);addElements(options.connect,scope_Base);bindSliderEvents(options.events);valueSet(options.start);if(options.pips){pips(options.pips)}
if(options.tooltips){tooltips()}
aria()}
setupSlider();scope_Self={destroy:destroy,steps:getNextSteps,on:bindEvent,off:removeEvent,get:valueGet,set:valueSet,setHandle:valueSetHandle,reset:valueReset,disable:disable,enable:enable,__moveHandles:function(upward,proposal,handleNumbers){moveHandles(upward,proposal,scope_Locations,handleNumbers)},options:originalOptions,updateOptions:updateOptions,target:scope_Target,removePips:removePips,removeTooltips:removeTooltips,getPositions:function(){return scope_Locations.slice()},getTooltips:function(){return scope_Tooltips},getOrigins:function(){return scope_Handles},pips:pips};return scope_Self}
function initialize(target,originalOptions){var options;var api;if(!target||!target.nodeName){throw new Error('noUiSlider: create requires a single element, got: '+target)}
if(target.noUiSlider){throw new Error('noUiSlider: Slider was already initialized.')}
options=testOptions(originalOptions);api=scope(target,options,originalOptions);target.noUiSlider=api;return api}
nouislider={__spectrum:Spectrum,cssClasses:cssClasses,create:initialize};exports.create=initialize;exports.cssClasses=cssClasses;exports.default=nouislider;Object.defineProperty(exports,'__esModule',{value:!0})})))