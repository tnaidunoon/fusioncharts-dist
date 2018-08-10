import ColumnDataset from'./column';import LineDataset from'./boxandwhiskerline';import{pluck,pluckNumber,toRaphaelColor,parseConfiguration,HUNDREDSTRING,parseUnsafeString,parseTooltext,getDashStyle,getDefinedColor,BLANKSTRING,preDefStr,COMMASTRING,COMMA,getValidValue,POSITION_LEFT,POSITION_MIDDLE,visibleStr,defined,getFirstValue,datasetFactory,getSuggestiveRotation}from'../lib/lib';import{convertColor,getLightColor,getColumnColor,getFirstAlpha,getFirstColor}from'../lib/lib-graphics';import{addDep}from'../dependency-manager';import boxandwhisker2dAnimation from'../animation-rules/boxandwhisker2d-animation';let UNDEFINED,PLOTBORDERCOLOR='plotBorderColor',PLOTGRADIENTCOLOR='plotGradientColor',SHOWSHADOW='showShadow',SETROLLOVERATTR='setRolloverAttr',SETROLLOUTATTR='setRolloutAttr',colorStrings=preDefStr.colors,COLOR_000000=colorStrings.c000000,LABEL=preDefStr.LABEL,ROLLOVER='DataPlotRollOver',ROLLOUT='DataPlotRollOut',UNDERSCORE=preDefStr.UNDERSCORE,POINTER=preDefStr.POINTER,BLANK=preDefStr.BLANK,ROUND=preDefStr.ROUND,GROUPID=preDefStr.GROUPID,POSITION_START=preDefStr.POSITION_START,POSITION_BOTTOM=preDefStr.POSITION_BOTTOM,POSITION_TOP=preDefStr.POSITION_TOP,showHoverEffectStr=preDefStr.showHoverEffectStr,EVENTARGS=preDefStr.EVENTARGS,POSITION_END=preDefStr.POSITION_END,M='M',H='H',V='V',BOLDSTARTTAG='<b>',BOLDENDTAG='</b>',BREAKSTRING='<br />',MAXIMUM_STR='Maximum',Q3_STR='Q3',MEDIAN_STR='Median',Q1_STR='Q1',MINIMUM_STR='Minimum',pStr=preDefStr.pStr,sStr=preDefStr.sStr,NONE='none',createChildIndices=function(e,o){let r=[];for(;o;)r.unshift(e+ +('.'+o)),o--;return r},createGroup=function(e,o,r){var a=r.getFromEnv('animationManager');return a.setAnimation({el:'group',attr:e,container:o,component:r,label:'group'})},_hide=function(){return function(){this.hide()}};addDep({name:'boxandwhisker2dAnimation',type:'animationRule',extension:boxandwhisker2dAnimation});class BoxAndWhiskerDataset extends ColumnDataset{createContainer(){var e,o,r=this,a=r.type,l=r.groupName,t=r.getLinkedParent(),i=l||r.dsGroup||a;t.getChildContainer(i+'VcanvasGroup')||(i='default'),e=t.getChildContainer(i+'VcanvasGroup'),o=t.getChildContainer(i+'ShadowVcanvasGroup'),r.getContainer('shadowGroup')||r.addContainer('shadowGroup',createGroup({name:'shadow-group'},o,r)),r.getContainer('commonElemsGroup')||r.addContainer('lowerBoxGroup',createGroup({name:'lower-box-group'},e,r)),r.getContainer('commonElemsGroup')||r.addContainer('upperBoxGroup',createGroup({name:'upper-box-group'},e,r)),r.getContainer('commonElemsGroup')||r.addContainer('upperWhiskerGroup',createGroup({name:'upper-whisker-group'},e,r)),r.getContainer('commonElemsGroup')||r.addContainer('lowerWhiskerGroup',createGroup({name:'lower-whisker-group'},e,r)),r.getContainer('commonElemsGroup')||r.addContainer('medianGroup',createGroup({name:'median-group'},e,r)),r.getContainer('labelGroup')||r.addContainer('labelGroup',createGroup({name:'label-group',class:'fusioncharts-datalabels'},t.getChildContainer('vcanvasLabelGroup'),r))}configureAttributes(e){var o=Math.max,r=Math.min;if(!e)return!1;this.trimData(e),this.config.JSONData=e;var a,l,t,s,n,p,d,h,u,c,b,m,w,g,x,v,k,B,C,A,E,f,L,y,T,S,W,q,V,Q,D,R,O,M,P,G,F,N,I,U,H,_,J,j,z,K,X,Y,Z,$,ee,oe,re,ae,le,te,ie,se,ne,pe,de,he,ue,ce,be,me,we,ge,xe,ve,ke,Be,Ce=this,Ae=Ce.config,Ee=Ce.config.JSONData,fe=Ee.data,Le=fe&&fe.length,ye=Ce.getFromEnv('chartConfig'),Te=Ce.getFromEnv('xAxis'),Se=Te.getTicksLen(),We=r(Se,Le),qe=Ce.getFromEnv('chart-attrib'),Ve=Ce.getFromEnv('color-manager'),Qe=Ae.index,De=Ae.plotColor=Ve.getPlotColor(Qe),Re=pluckNumber(Ee.dashed,qe.plotborderdashed),Oe=ye.useplotgradientcolor,Me=ye.yaxisname,Pe=ye.xaxisname,Ge=parseUnsafeString(pluck(qe.tooltipsepchar,': ')),Fe=Ce.components.data,Ne=Ce.getFromEnv('number-formatter'),Ie=-Infinity,Ue=+Infinity,He=Ce.getFromEnv('BoxAndWhiskerStatisticalCalc');for(Ce.setState('visible',1===pluckNumber(Ce.config.JSONData.visible,!+Ce.config.JSONData.initiallyhidden,1)),parseConfiguration(Ee,Ae,ye,{data:!0}),Ae.defaultPadding={left:.5,right:.5},Ae.seriesname=parseUnsafeString(Ee.seriesname),Ae.includeInLegend=pluckNumber(Ee.includeinlegend,Ae.seriesname?1:0),Ae.legendSymbolColor=Ae.plotColor,a=Ae.showplotborder,u=Ae.plotborderdashlen,c=Ae.plotborderdashgap,x=Ae.plotfillalpha,m=Ae.useroundedges,v=Ae.ratio,b=Ae.plotborderthickness,ge=Ae.showvalues=pluckNumber(Ee.showvalues,qe.showvalues,1),l=Ae.showtooltip,Ae.rotatevalues&&(Ae.rotatevalues=270),xe=Ae.showalloutliers,Ae.plotfillAngle=g=pluckNumber(360-qe.plotfillangle,90),Ae.plotColor=De=pluck(Ee.color,De),Ae.plotRadius=pluckNumber(qe.useroundedges,m?1:0),Ae.plotgradientcolor=k=getDefinedColor(qe.plotgradientcolor,Ve.getColor(PLOTGRADIENTCOLOR)),Oe||(k=BLANKSTRING),Ae.plotBorderAlpha=B=a?pluck(qe.plotborderalpha,x,HUNDREDSTRING):0,Ae.plotBorderColor=C=pluck(qe.plotbordercolor,Ve.getColor(PLOTBORDERCOLOR)),Ae.plotBorderDashStyle=A=Re?getDashStyle(u,c,b):NONE,Ae.showShadow=m?pluckNumber(qe.showshadow,1):pluckNumber(qe.showshadow,Ve.getColor(SHOWSHADOW)),Ae.showHoverEffect=w=pluckNumber(qe.plothovereffect,qe.showhovereffect,UNDEFINED),Ae.parentYAxis=X=pluck(Ee.parentyaxis&&Ee.parentyaxis.toLowerCase(),pStr)===sStr?1:0,Ae.dataSeparator=COMMASTRING,Ae.textDirection='1'===qe.hasrtltext?'rtl':BLANKSTRING,Ae.showMeanLegend=Ae.showSDLegend=Ae.showMDLegend=Ae.showQDLegend=Ae.showOutliersLegend=0,Ce.components.data||(Ce.components.data=[]),Fe=Ce.components.data,Ae.upperBoxColor=ue=pluck(Ee.upperboxcolor,qe.upperboxcolor,Ve.getPlotColor(2*Qe)),ce=Ae.upperBoxAlpha=pluck(Ee.upperboxalpha,qe.upperboxalpha,x,HUNDREDSTRING),Ae.lowerBoxColor=be=pluck(Ee.lowerboxcolor,qe.lowerboxcolor,Ve.getPlotColor(2*Qe+1)),me=Ae.lowerBoxAlpha=pluck(Ee.lowerboxalpha,qe.lowerboxalpha,x,HUNDREDSTRING),ee=0;ee<We;ee++){if(E=fe&&fe[ee],L=Fe[ee],y=L&&L.config,L||(L=Fe[ee]={graphics:{}}),L.config||(y=Fe[ee].config={}),!E.value){y.setValue=UNDEFINED;continue}E.value&&(He.setArray(E.value),oe=He.getQuartiles(),re=oe.q1,ae=oe.q3,le=He.getMinMax(),y.min=te=le.min,y.max=ie=le.max,se=He.getMedian(),y.mean=ne=He.getMean(),y.md=pe=He.getMD(),y.sd=de=He.getSD(),y.qd=he=He.getQD()),y.upperQuartile={value:ae,color:convertColor(pluck(E.upperquartilecolor,Ee.upperquartilecolor,qe.upperquartilecolor,qe.plotbordercolor,Ve.getColor(PLOTBORDERCOLOR)),pluckNumber(E.upperquartilealpha,Ee.upperquartilealpha,qe.upperquartilealpha,qe.plotborderalpha,100)),borderWidth:pluckNumber(E.upperquartilethickness,Ee.upperquartilethickness,qe.upperquartilethickness,qe.plotborderthickness,m?0:1),displayValue:Ne.dataLabels(ae)},y.lowerQuartile={value:re,color:convertColor(pluck(E.lowerquartilecolor,Ee.lowerquartilecolor,qe.lowerquartilecolor,qe.plotbordercolor,Ve.getColor(PLOTBORDERCOLOR)),pluckNumber(E.lowerquartilealpha,Ee.lowerquartilealpha,qe.lowerquartilealpha,qe.plotborderalpha,100)),borderWidth:pluckNumber(E.lowerquartilethickness,Ee.lowerquartilethickness,qe.lowerquartilethickness,qe.plotborderthickness,m?0:1),displayValue:Ne.dataLabels(re)},y.upperBoxBorder={color:convertColor(pluck(E.upperboxbordercolor,Ee.upperboxbordercolor,qe.upperboxbordercolor,qe.plotbordercolor,Ve.getColor(PLOTBORDERCOLOR)),pluckNumber(E.upperboxborderalpha,Ee.upperboxborderalpha,qe.upperboxborderalpha,qe.plotborderalpha,100)),borderWidth:pluckNumber(E.upperboxborderthickness,Ee.upperboxborderthickness,qe.upperboxborderthickness,!m&&qe.plotborderthickness,m?0:1)},y.lowerBoxBorder={color:convertColor(pluck(E.lowerboxbordercolor,Ee.lowerboxbordercolor,qe.lowerboxbordercolor,qe.plotbordercolor,Ve.getColor(PLOTBORDERCOLOR)),pluckNumber(E.lowerboxborderalpha,Ee.lowerboxborderalpha,qe.lowerboxborderalpha,qe.plotborderalpha,100)),borderWidth:pluckNumber(E.lowerboxborderthickness,Ee.lowerboxborderthickness,qe.lowerboxborderthickness,!m&&qe.plotborderthickness,m?0:1)},y.median={value:se,color:convertColor(pluck(E.mediancolor,Ee.mediancolor,qe.mediancolor,qe.plotbordercolor,Ve.getColor(PLOTBORDERCOLOR)),pluckNumber(E.medianalpha,Ee.medianalpha,qe.medianalpha,qe.plotborderalpha,100)),borderWidth:pluckNumber(E.medianthickness,Ee.medianthickness,qe.medianthickness,qe.plotborderthickness,1),displayValue:Ne.dataLabels(se)},Ae.upperBoxColor=ue=pluck(E.upperboxcolor,Ee.upperboxcolor,qe.upperboxcolor,Ve.getPlotColor(2*Qe)),ce=Ae.upperBoxAlpha=pluck(E.upperboxalpha,Ee.upperboxalpha,qe.upperboxalpha,x,HUNDREDSTRING),Ae.lowerBoxColor=be=pluck(E.lowerboxcolor,Ee.lowerboxcolor,qe.lowerboxcolor,Ve.getPlotColor(2*Qe+1)),me=Ae.lowerBoxAlpha=pluck(E.lowerboxalpha,Ee.lowerboxalpha,qe.lowerboxalpha,x,HUNDREDSTRING),y.upperColorArr=getColumnColor(ue,ce,UNDEFINED,UNDEFINED,m,C,B.toString(),0,!1),y.lowerColorArr=getColumnColor(be,me,UNDEFINED,UNDEFINED,m,C,B.toString(),0,!1),y.showValue=pluckNumber(E.showvalue,ge),y.showMinValues=y.showValue?pluckNumber(E.showminvalues,Ae.showminvalues):0,y.showMaxValues=y.showValue?pluckNumber(E.showmaxvalues,Ae.showmaxvalues):0,y.showQ1Values=y.showValue?pluckNumber(E.showq1values,Ae.showq1values):0,y.showQ3Values=y.showValue?pluckNumber(E.showq3values,Ae.showq3values):0,y.showMedianValues=y.showValue?pluckNumber(E.showmedianvalues,Ae.showmedianvalues):0,y.upperWhiskerAlpha=we=getFirstAlpha(pluck(E.upperwhiskeralpha,Ee.upperwhiskeralpha,qe.upperwhiskeralpha,qe.plotborderalpha,100)),y.upperWhiskerColor=convertColor(getFirstColor(pluck(E.upperwhiskercolor,Ee.upperwhiskercolor,qe.upperwhiskercolor,qe.plotbordercolor,Ve.getColor(PLOTBORDERCOLOR))),we),y.upperWhiskerThickness=pluckNumber(E.upperwhiskerthickness,Ee.upperwhiskerthickness,qe.upperwhiskerthickness,qe.plotborderthickness,1),y.upperWhiskerShadowOpacity=Ae.showShadow?we/250:0,y.lowerWhiskerAlpha=ke=getFirstAlpha(pluck(E.lowerwhiskeralpha,Ee.lowerwhiskeralpha,qe.lowerwhiskeralpha,qe.plotborderalpha,100)),y.lowerWhiskerColor=convertColor(getFirstColor(pluck(E.lowerwhiskercolor,Ee.lowerwhiskercolor,qe.lowerwhiskercolor,qe.plotbordercolor,Ve.getColor(PLOTBORDERCOLOR))),ke),y.lowerWhiskerThickness=pluckNumber(E.lowerwhiskerthickness,Ee.lowerwhiskerthickness,qe.lowerwhiskerthickness,qe.plotborderthickness,1),y.lowerWhiskerShadowOpacity=Ae.showShadow?ke/250:0,y.setValue=f=Ne.getCleanValue(E.value),y.setLink=pluck(E.link),y.toolTipValue=z=Ne.dataLabels(f,X),y.setDisplayValue=K=parseUnsafeString(E.displayvalue),y.displayValue=pluck(K,z),Y=pluckNumber(E.dashed),Z=pluckNumber(E.dashlen,u),$=c=pluckNumber(E.dashgap,c),Ie=o(Ie,ie),Ue=r(Ue,te),y.plotBorderDashStyle=1===Y?getDashStyle(Z,$,b):0===Y?NONE:A,De=pluck(E.color,Ae.plotColor),x=pluck(E.alpha,Ae.plotfillalpha),0>f&&!m&&(d=g,g=360-g),y.colorArr=getColumnColor(De+COMMA+k,x,v,g,m,C,B.toString(),0,!1),y.label=T=getValidValue(parseUnsafeString(Te.getLabel(pluckNumber(ee)).label)),0!==w&&(S=pluck(E.upperboxhovercolor,Ee.upperboxhovercolor,qe.upperboxhovercolor,ue),W=pluck(E.upperboxhoveralpha,Ee.upperboxhoveralpha,qe.upperboxhoveralpha,ce),q=pluck(E.upperboxborderhovercolor,Ee.upperboxborderhovercolor,qe.upperboxborderhovercolor,E.upperboxbordercolor,Ee.upperboxbordercolor,qe.upperboxbordercolor,qe.plotbordercolor,Ve.getColor(PLOTBORDERCOLOR)),V=pluck(E.upperboxborderhoveralpha,Ee.upperboxborderhoveralpha,qe.upperboxborderhoveralpha,E.upperboxborderalpha,Ee.upperboxborderalpha,qe.upperboxborderalpha,qe.plotborderalpha,100),Q=m?0:pluck(E.upperboxborderhoverthickness,Ee.upperboxborderhoverthickness,qe.upperboxborderhoverthickness,y.upperBoxBorder.borderWidth),D=pluck(E.lowerboxhovercolor,Ee.lowerboxhovercolor,qe.lowerboxhovercolor,be),R=pluck(E.lowerboxhoveralpha,Ee.lowerboxhoveralpha,qe.lowerboxhoveralpha,me),O=pluck(E.lowerboxborderhovercolor,Ee.lowerboxborderhovercolor,qe.lowerboxborderhovercolor,E.lowerboxbordercolor,Ee.lowerboxbordercolor,qe.lowerboxbordercolor,qe.plotbordercolor,Ve.getColor(PLOTBORDERCOLOR)),M=pluck(E.lowerboxborderhoveralpha,Ee.lowerboxborderhoveralpha,qe.lowerboxborderhoveralpha,E.lowerboxborderalpha,Ee.lowerboxborderalpha,qe.lowerboxborderalpha,qe.plotborderalpha,100),P=m?0:pluck(E.lowerboxborderhoverthickness,Ee.lowerboxborderhoverthickness,qe.lowerboxborderhoverthickness,y.lowerBoxBorder.borderWidth),G=pluck(E.upperquartilehovercolor,Ee.upperquartilehovercolor,qe.upperquartilehovercolor,E.upperquartilecolor,Ee.upperquartilecolor,qe.upperquartilecolor,qe.plotbordercolor,Ve.getColor(PLOTBORDERCOLOR)),F=pluck(E.upperquartilehoveralpha,Ee.upperquartilehoveralpha,qe.upperquartilehoveralpha,E.upperquartilealpha,Ee.upperquartilealpha,qe.upperquartilealpha,qe.plotborderalpha,100),N=pluck(E.upperquartilehoverthickness,Ee.upperquartilehoverthickness,qe.upperquartilehoverthickness,y.upperQuartile.borderWidth),I=pluck(E.lowerquartilehovercolor,Ee.lowerquartilehovercolor,qe.lowerquartilehovercolor,E.lowerquartilecolor,Ee.lowerquartilecolor,qe.lowerquartilecolor,qe.plotbordercolor,Ve.getColor(PLOTBORDERCOLOR)),U=pluck(E.lowerquartilehoveralpha,Ee.lowerquartilehoveralpha,qe.lowerquartilehoveralpha,E.lowerquartilealpha,Ee.lowerquartilealpha,qe.lowerquartilealpha,qe.plotborderalpha,100),H=pluck(E.lowerquartilehoverthickness,Ee.lowerquartilehoverthickness,qe.lowerquartilehoverthickness,y.lowerQuartile.borderWidth),_=pluck(E.medianhovercolor,Ee.medianhovercolor,qe.medianhovercolor,E.mediancolor,Ee.mediancolor,qe.mediancolor,qe.plotbordercolor,Ve.getColor(PLOTBORDERCOLOR)),J=pluck(E.medianhoveralpha,Ee.medianhoveralpha,qe.medianhoveralpha,E.medianalpha,Ee.medianalpha,qe.medianalpha,qe.plotborderalpha,100),j=pluck(E.medianhoverthickness,Ee.medianhoverthickness,qe.medianhoverthickness,y.median.borderWidth),1===w&&(ue===S&&(S=getLightColor(S,70)),be===D&&(D=getLightColor(D,70))),y.upperBoxHoverColorArr=getColumnColor(S,W,UNDEFINED,UNDEFINED,m,C,B.toString(),0,!1),y.lowerBoxHoverColorArr=getColumnColor(D,R,UNDEFINED,UNDEFINED,m,C,B.toString(),0,!1),y.setUpperBoxRolloutAttr={fill:toRaphaelColor(y.upperColorArr[0])},y.setUpperBoxRolloverAttr={fill:toRaphaelColor(y.upperBoxHoverColorArr[0])},y.setLowerBoxRolloutAttr={fill:toRaphaelColor(y.lowerColorArr[0])},y.setLowerBoxRolloverAttr={fill:toRaphaelColor(y.lowerBoxHoverColorArr[0])},y.setUpperBoxBorderRolloverAttr={stroke:convertColor(q,V),"stroke-width":Q},y.setUpperBoxBorderRolloutAttr={stroke:y.upperBoxBorder.color,"stroke-width":y.upperBoxBorder.borderWidth},y.setLowerBoxBorderRolloverAttr={stroke:convertColor(O,M),"stroke-width":P},y.setLowerBoxBorderRolloutAttr={stroke:y.lowerBoxBorder.color,"stroke-width":y.lowerBoxBorder.borderWidth},y.setUpperQuartileRolloverAttr={stroke:convertColor(G,F),"stroke-width":N},y.setUpperQuartileRolloutAttr={stroke:y.upperQuartile.color,"stroke-width":y.upperQuartile.borderWidth},y.setLowerQuartileRolloverAttr={stroke:convertColor(I,U),"stroke-width":H},y.setLowerQuartileRolloutAttr={stroke:y.lowerQuartile.color,"stroke-width":y.lowerQuartile.borderWidth},y.setMedianRolloverAttr={stroke:convertColor(_,J),"stroke-width":j},y.setMedianRolloutAttr={stroke:y.median.color,"stroke-width":y.median.borderWidth}),t=y.toolTipValue,n=getValidValue(parseUnsafeString(pluck(E.tooltext,Ee.plottooltext,qe.plottooltext))),l?null===t?h=!1:n===UNDEFINED?h='<b>Maximum'+Ge+BOLDENDTAG+Ne.dataLabels(ie)+BREAKSTRING+BOLDSTARTTAG+Q3_STR+Ge+BOLDENDTAG+Ne.dataLabels(ae)+BREAKSTRING+BOLDSTARTTAG+MEDIAN_STR+Ge+BOLDENDTAG+Ne.dataLabels(se)+BREAKSTRING+BOLDSTARTTAG+Q1_STR+Ge+BOLDENDTAG+Ne.dataLabels(re)+BREAKSTRING+BOLDSTARTTAG+MINIMUM_STR+Ge+BOLDENDTAG+Ne.dataLabels(te):(p=[1,2,3,4,5,6,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80],s={maxValue:ie,maxDataValue:Ne.dataLabels(ie),minValue:te,minDataValue:Ne.dataLabels(te),Q1:Ne.dataLabels(re),unformattedQ1:re,Q3:Ne.dataLabels(ae),unformattedQ3:ae,median:Ne.dataLabels(se),unformattedMedian:se,SD:Ne.dataLabels(de),unformattedsd:de,QD:Ne.dataLabels(he),unformattedQD:he,MD:Ne.dataLabels(pe),unformattedMD:pe,mean:Ne.dataLabels(ne),unformattedMean:ne,label:T,yaxisName:Me,xaxisName:Pe,formattedValue:t,value:T},h=parseTooltext(n,p,s,E,qe,Ee)):h=!1,y.toolText=h,y.setTooltext=h,d&&(g=d)}xe?(Be=Ce._getOutLiersLimit(),Ie=o(Ie,Be.max),Ue=r(Ue,Be.min)):(ve=Ie-Ue,Ie+=Ae.outliersupperrangeratio*ve,Ue-=Ae.outlierslowerrangeratio*ve),Ae.maxValue=Ie,Ae.minValue=Ue,Ce.setState('dirty',!0),Ce._createSubDS(),ye.showLegend&&Ce._addLegend()}_createSubDS(){var e=this,o=e.config,r=o.index,a=e.getFromEnv('lineJSON')[r],l=a.length;datasetFactory(e,LineDataset,'dataset',l,a,createChildIndices(r,l)),l||e.iterateComponents(e=>{'line'===e.getName()&&e.remove()})}_getOutLiersLimit(){var e,o,r,a,l,t=this,s=t.config.index,n=t.getFromEnv('lineJSON')[s],p=n.length,d=-Infinity,h=+Infinity;for(l=0;l<p;l++)if(e=n[l],'Outliers'===e.seriesname){for(a=e.data,o=a.length,r=0;r<o;r++)d=Math.max(a[r].value,d),h=Math.min(a[r].value,h);return{max:d,min:h}}return{max:d,min:h}}parsePlotAttributes(e,o){var r,a,l,t,s,n,p,d,h,u,c,b,m,w,g,x,v,k,B,C,A,E,f,L,y,T,S,W,q,Q,D,R,O,P,G,F,N,I,U,_,J,j,z,K,X,Y,Z,$,ee,oe,re,ae,le,te,ie,se=Math.round,ne=Math.max,pe=Math.min,de=this,he=de.config.JSONData,ue=de.config,ce=ue.index,be=o,i=de.getState('visible'),me=de.getFromEnv('chart'),we=de.getFromEnv('chartConfig'),ge=de.getFromEnv('xAxis'),xe=de.getFromEnv('yAxis'),ve=de.components.data,ke=we.dataLabelStyle,Be=ue.rotatevalues,Ce=ue.valuepadding,Ae=de.getFromEnv('number-formatter'),Ee=Be?POSITION_LEFT:POSITION_MIDDLE,fe=de.getFromEnv('smartLabel'),Le=+Infinity;l=de.getFromEnv('columnXShift'),a=de.getFromEnv('columnWidth'),p=e&&e.config,n=p&&p.setValue;e===UNDEFINED||n===UNDEFINED||null===n||(y=e.graphics,s=p.setLink,!e.graphics&&(ve[be].graphics={}),!y.label&&(ve[be].graphics.label=[]),r=ge.getPixel(be)+l,d=p.upperQuartile||{},h=d&&d.value,u=(h||0===h)&&xe.getPixel(h),c=p.lowerQuartile||{},b=c&&c.value,m=(b||0===b)&&xe.getPixel(b),w=p.median,g=w&&w.value,x=(g||0===g)&&xe.getPixel(g),v=x-u,k=m-x,B=p.upperBoxBorder||{},C=p.lowerBoxBorder||{},t=p.toolText,p.eventArgs={index:be,link:s,maximum:p.max,minimum:p.min,median:g,q3:d.value,q1:c.value,maxDisplayValue:p.showMaxValues?Ae.dataLabels(p.max):BLANKSTRING,minDisplayValue:p.showMinValues?Ae.dataLabels(p.min):BLANKSTRING,medianDisplayValue:p.showMedianValues?Ae.dataLabels(g):BLANKSTRING,q1DisplayValue:p.showQ1Values?Ae.dataLabels(c.value):BLANKSTRING,q3DisplayValue:p.showQ3Values?Ae.dataLabels(d.value):BLANKSTRING,categoryLabel:p.label,toolText:t,datasetIndex:ce,datasetName:he.seriesname,visible:i},A=se(r)+.5*(B.borderWidth%2),E=se(r+a)+.5*(B.borderWidth%2),f=se(u)+.5*(d.borderWidth%2),a=E-A,L={upperBox:{fill:toRaphaelColor(p.upperColorArr[0]),"stroke-width":0,"stroke-dasharray":NONE,cursor:s?POINTER:BLANKSTRING,visibility:i},lowerBox:{fill:toRaphaelColor(p.lowerColorArr[0]),"stroke-width":0,"stroke-dasharray":NONE,cursor:s?POINTER:BLANK,visibility:i},upperBoxBorder:{stroke:B.color,"stroke-width":B.borderWidth,"stroke-linecap":ROUND,dashstyle:B.dashStyle,visibility:i},lowerBoxBorder:{stroke:C.color,"stroke-width":C.borderWidth,dashstyle:C.dashStyle,"stroke-linecap":ROUND,visibility:i},upperQuartile:{stroke:toRaphaelColor(d.color),"stroke-width":d.borderWidth,"stroke-dasharray":d.dashSyle,"stroke-linecap":ROUND,cursor:s?POINTER:BLANK,visibility:i},lowerQuartile:{stroke:toRaphaelColor(c.color),"stroke-width":c.borderWidth,"stroke-dasharray":c.dashSyle,cursor:s?POINTER:BLANKSTRING,"stroke-linecap":ROUND,visibility:i},median:{stroke:toRaphaelColor(w.color),"stroke-width":w.borderWidth,"stroke-dasharray":w.dashSyle,cursor:s?POINTER:BLANKSTRING,"stroke-linecap":ROUND,visibility:i}},ae=N||f,K=Object.assign({x:A,y:N||f,width:ne(a,0),height:ne(pe(Le,v),0),r:0},L.upperBox),z=Object.assign({path:[M,A,N||f,V,N||f+v,M,E,N||f,V,N||f+v]},L.upperBoxBorder),X=Object.assign({path:[M,A,N||f,H,A+a]},L.upperQuartile),T=f,S=a*(ue.whiskerslimitswidthratio/100),W=S/2,q=xe.getPixel(p.max),D=q,Q=A,D=se(q)+p.upperWhiskerThickness%2/2,A=se(A+a/2)+p.upperWhiskerThickness%2/2,R=[M,A,N||T,V,pe(N||D,ae),M,A-W,pe(N||D,ae),H,A+W],Y={path:R,"stroke-width":p.upperWhiskerThickness,cursor:s?POINTER:BLANKSTRING,"stroke-linecap":ROUND,stroke:p.upperWhiskerColor},fe.useEllipsesOnOverflow(me.config.useEllipsesWhenOverflow),fe.setStyle(ke),O=fe.getOriSize(Ae.dataLabels(p.max)),P=Be?O.width:O.height,F=q-.5*p.upperWhiskerThickness-Ce-P*(Be?.5:1),F-(Be?P/2:0)<we.canvasTop&&(F=we.canvasTop+(Be?P/2:0)),Z={text:Ae.dataLabels(p.max),x:Q+a/2,title:d.originalText||BLANKSTRING,y:N||F,"text-anchor":Be?POSITION_MIDDLE:Ee,"vertical-align":Be?POSITION_MIDDLE:POSITION_TOP,visibility:visibleStr,direction:ue.textDirection,fill:ke.color,transform:getSuggestiveRotation(Be,Q+a/2,F),"text-bound":[ke.backgroundColor,ke.borderColor,ke.borderThickness,ke.borderPadding,ke.borderRadius,ke.borderDash]},A=se(r)+.5*(C.borderWidth%2),E=se(r+a)+.5*(C.borderWidth%2),f=se(x+k)+.5*(c.borderWidth%2),le=N||x,te=ne(pe(Le,f-x),0),ie=le+te,U=Object.assign({x:A,y:le,width:ne(a,0),height:te,r:0},L.lowerBox),I=Object.assign({path:[M,A,N||x,V,N||x+k,M,E,N||x,V,N||x+k]},L.lowerBoxBorder),f=se(x+k)+.5*(c.borderWidth%2),_=Object.assign({path:[M,A,N||f,H,A+a]},L.lowerQuartile),T=f,S=a*(ue.whiskerslimitswidthratio/100),W=S/2,q=xe.getPixel(p.min),D=q,Q=A,D=se(q)+p.lowerWhiskerThickness%2/2,Q=se(Q+a/2)+p.lowerWhiskerThickness%2/2,R=[M,Q,N||T,V,ne(N||D,ie),M,Q-W,ne(N||D,ie),H,Q+W],fe.setStyle(ke),O=fe.getOriSize(Ae.dataLabels(p.min)),P=Be?O.width:O.height,G=q+.5*p.lowerWhiskerThickness+Ce,G+P>we.canvasBottom&&(G=we.canvasBottom-P),$={text:Ae.dataLabels(p.min),x:Q,title:d.originalText||BLANKSTRING,y:N||G,"text-anchor":Be?POSITION_END:Ee,"vertical-align":Be?POSITION_MIDDLE:POSITION_TOP,visibility:visibleStr,direction:ue.textDirection,fill:ke.color,transform:getSuggestiveRotation(Be,Q,G),"text-bound":[ke.backgroundColor,ke.borderColor,ke.borderThickness,ke.borderPadding,ke.borderRadius,ke.borderDash]},J={path:R,"stroke-width":p.lowerWhiskerThickness,cursor:s?POINTER:BLANKSTRING,"stroke-linecap":ROUND,stroke:p.lowerWhiskerColor},f=se(x)+.5*(w.borderWidth%2),j=Object.assign({path:[M,A,N||f,H,A+a]},L.median),Ee=Be?POSITION_LEFT:POSITION_MIDDLE,ee={text:d.displayValue,x:r+a/2,title:d.originalText||BLANKSTRING,y:u-Ce,"text-anchor":Be?POSITION_START:Ee,"vertical-align":Be?POSITION_MIDDLE:POSITION_BOTTOM,visibility:visibleStr,direction:ue.textDirection,fill:ke.color,transform:getSuggestiveRotation(Be,r+a/2,u-Ce),"text-bound":[ke.backgroundColor,ke.borderColor,ke.borderThickness,ke.borderPadding,ke.borderRadius,ke.borderDash]},re={text:w.displayValue,x:A+a/2,y:x-Ce,title:w.originalText||BLANKSTRING,"text-anchor":Be?POSITION_START:Ee,"vertical-align":Be?POSITION_MIDDLE:POSITION_BOTTOM,visibility:visibleStr,direction:ue.textDirection,fill:ke.color,transform:getSuggestiveRotation(Be,A+a/2,x-Ce),"text-bound":[ke.backgroundColor,ke.borderColor,ke.borderThickness,ke.borderPadding,ke.borderRadius,ke.borderDash]},oe={text:c.displayValue,x:r+a/2,y:m+Ce,title:c.originalText||BLANKSTRING,"text-anchor":Be?POSITION_START:Ee,"vertical-align":Be?POSITION_MIDDLE:POSITION_TOP,visibility:visibleStr,direction:ue.textDirection,fill:ke.color,transform:getSuggestiveRotation(Be,r+a/2,m+Ce),"text-bound":[ke.backgroundColor,ke.borderColor,ke.borderThickness,ke.borderPadding,ke.borderRadius,ke.borderDash]},p.props={lowerBoxBorderEle:{attr:I},lowerBoxElem:{attr:U},lowerQuartileEle:{attr:_},lowerWhiskerEle:{attr:J},midLineElem:{attr:j},upperBoxElem:{attr:K},upperBoxBorderEle:{attr:z},upperQuartileEle:{attr:X},upperWhiskerEle:{attr:Y},upperQuartileMaxLabel:{attr:Z},upperQuartileMinLabel:{attr:$},medianLabel:{attr:re},upperQuartileLabel:{attr:ee},lowerQuartileLabel:{attr:oe}})}allocatePosition(){var e,o,r,a=this,l=a.config.JSONData.data,t=l&&l.length,s=a.getFromEnv('xAxis'),n=s.getTicksLen(),p=a.components.data;for(r=Math.min(n,t),a.setColumnPosition(),o=0;o<r;o++)e=p[o],a.parsePlotAttributes(e,o)}drawPlots(){var e,o,r,a,l,t,s,n,p,d,h,u,c,b,m,w,g,x,v,B,C,A,E,f,L,y,T,S,W,q,V,Q,D,R,O,M,P,G,F,N,I,U,H,_,J,j,z,K,X=this,Y=X.config.JSONData,Z=X.config,$=Z.index,ee=Y.data,oe=ee&&ee.length,re=X.getState('visible'),ae=X.getFromEnv('chart'),le=X.getFromEnv('xAxis'),te=le.getTicksLen(),ie=Z.showtooltip,se=X.getFromEnv('toolTipController'),ne=X.components.data,pe=Z.showShadow,de=X.getContainer('upperBoxGroup').toBack(),he=X.getContainer('lowerBoxGroup'),ue=X.getContainer('medianGroup'),ce=X.getContainer('upperWhiskerGroup'),be=X.getContainer('lowerWhiskerGroup'),me=X.getContainer('labelGroup'),we=X.getContainer('shadowGroup'),ge=X.getFromEnv('smartLabel'),xe=X.components.removeDataArr||[],ve=xe.length,ke=Z.showHoverEffect,Be=X.getFromEnv('animationManager'),Ce=function(o){return function(r){ae.plotEventHandler(o,r)}},Ae=function(e,o){return function(r){if(0!==o.data(showHoverEffectStr))for(var a in e)a!==LABEL&&(Be.setAnimation({el:e[a],doNotRemove:!0,attr:o.data(SETROLLOVERATTR)[a],component:X}),ae.plotEventHandler(o,r,ROLLOVER))}},Ee=function(e,o){return function(r){if(0!==o.data(showHoverEffectStr))for(var a in e)a!==LABEL&&(Be.setAnimation({el:e[a],doNotRemove:!0,attr:o.data(SETROLLOUTATTR)[a],component:X}),ae.plotEventHandler(o,r,ROLLOUT))}};for(n=function(e){return function(){this.show(),this.shadow(e)}},X.setColumnPosition(),re?(de.show(),he.show(),ce.show(),be.show(),ue.show(),we.show(),me.show(),X._conatinerHidden=!1):(me.hide(),ce.hide(),de.hide(),be.hide(),he.hide(),ue.hide(),we.hide()),e=Math.min(te,oe),o=0;o<e;o++){if(a=ne[o],t=a&&a.config,l=t&&t.setValue,O=!1,M=!1,P=!1,G=!1,F=!1,N=!1,I=!1,U=!1,H=!1,a===UNDEFINED||l===UNDEFINED||null===l){for(D in R=a.graphics,R)if(R[D]instanceof Array)for(z=R[D],j=0,K=z.length;j<K;j++)z[j]&&z[j].hide();else R[D].hide();continue}T=a.graphics,a.graphics||(ne[o].graphics={}),T.label||(ne[o].graphics.label=[]),s=t.upperQuartile||{},p=t.lowerQuartile||{},d=t.median,r=t.toolText,S=$+UNDERSCORE+o,u=a.graphics.upperBoxElem,h=Be.setAnimation({el:u||'rect',attr:t.props.upperBoxElem.attr,label:'upperBox',container:de,component:X}),u||(a.graphics.upperBoxElem=h,O=!0),h.shadow({opacity:pe?Z.upperBoxAlpha/100:0},we),b=a.graphics.upperBoxBorderEle,c=Be.setAnimation({el:b||'path',attr:t.props.upperBoxBorderEle.attr,container:de,label:'path',component:X}),b||(a.graphics.upperBoxBorderEle=c,P=!0),w=a.graphics.upperQuartileEle,m=Be.setAnimation({el:w||'path',attr:t.props.upperQuartileEle.attr,label:'path',container:de,component:X}),w||(a.graphics.upperQuartileEle=m,F=!0),q=a.graphics.upperWhiskerEle,W=Be.setAnimation({el:q||'path',attr:t.props.upperWhiskerEle.attr,label:'path',container:ce,component:X}),n({opacity:t.upperWhiskerShadowOpacity},we),q||(a.graphics.upperWhiskerEle=W,U=!0),ge.useEllipsesOnOverflow(ae.config.useEllipsesWhenOverflow),t.showMaxValues?(y=T.label[3],y&&y.show(),L=Be.setAnimation({el:y||'text',attr:t.props.upperQuartileMaxLabel.attr,component:X,label:'text',container:me}),!y&&(T.label[3]=L),T.label[3].data(GROUPID,S)):T.label[3]&&Be.setAnimation({el:T.label[3],component:X,attr:{"text-bound":[]},callback:_hide.call(T.label[3])}),x=a.graphics.lowerBoxElem,g=Be.setAnimation({el:x||'rect',attr:t.props.lowerBoxElem.attr,label:'lowerBox',container:he,component:X}),x||(a.graphics.lowerBoxElem=g,M=!0),g.shadow({opacity:pe?Z.lowerBoxAlpha/100:0},we),B=a.graphics.lowerBoxBorderEle,v=Be.setAnimation({el:B||'path',attr:t.props.lowerBoxBorderEle.attr,component:X,label:'path',container:he}),B||(a.graphics.lowerBoxBorderEle=v,G=!0),A=a.graphics.lowerQuartileEle,C=Be.setAnimation({el:A||'path',attr:t.props.lowerQuartileEle.attr,component:X,label:'path',container:he}),A||(a.graphics.lowerQuartileEle=C,N=!0),V=a.graphics.lowerWhiskerEle,t.showMinValues?(y=T.label[4],y&&y.show(),L=Be.setAnimation({el:y||'text',attr:t.props.upperQuartileMinLabel.attr,label:'text',container:me,component:X}),!y&&(T.label[4]=L),T.label[4].data(GROUPID,S)):T.label[4]&&Be.setAnimation({el:T.label[4],component:X,attr:{"text-bound":[]},callback:_hide.call(T.label[4])}),Q=a.graphics.lowerWhiskerEle,V=Be.setAnimation({el:Q||'path',attr:t.props.lowerWhiskerEle.attr,label:'path',container:be,component:X,callback:n({opacity:t.lowerWhiskerShadowOpacity},we)}),Q||(a.graphics.lowerWhiskerEle=V,H=!0),f=a.graphics.midLineElem,E=Be.setAnimation({el:f||'path',component:X,label:'midline',container:ue,attr:t.props.midLineElem.attr}),f||(a.graphics.midLineElem=E,I=!0),_={upperBoxElem:t.setUpperBoxRolloverAttr,lowerBoxElem:t.setLowerBoxRolloverAttr,upperBoxBorderEle:t.setUpperBoxBorderRolloverAttr,lowerBoxBorderEle:t.setLowerBoxBorderRolloverAttr,upperQuartileEle:t.setUpperQuartileRolloverAttr,lowerQuartileEle:t.setLowerQuartileRolloverAttr,midLineElem:t.setMedianRolloverAttr},J={upperBoxElem:t.setUpperBoxRolloutAttr,lowerBoxElem:t.setLowerBoxRolloutAttr,upperBoxBorderEle:t.setUpperBoxBorderRolloutAttr,lowerBoxBorderEle:t.setLowerBoxBorderRolloutAttr,upperQuartileEle:t.setUpperQuartileRolloutAttr,lowerQuartileEle:t.setLowerQuartileRolloutAttr,midLineElem:t.setMedianRolloutAttr},h.data(GROUPID,S).data(EVENTARGS,t.eventArgs).data(showHoverEffectStr,ke).data(SETROLLOVERATTR,_).data(SETROLLOUTATTR,J),O&&(h.on('click',Ce(h)),h.on('mouseover',Ae(a.graphics,h)),h.on('mouseout',Ee(a.graphics,h))),g.data(GROUPID,S).data(EVENTARGS,t.eventArgs).data(showHoverEffectStr,ke).data(SETROLLOVERATTR,_).data(SETROLLOUTATTR,J),M&&(g.on('click',Ce(g)),g.on('mouseover',Ae(a.graphics,g)),g.on('mouseout',Ee(a.graphics,g))),c.data(GROUPID,S).data(EVENTARGS,t.eventArgs).data(showHoverEffectStr,ke).data(SETROLLOVERATTR,_).data(SETROLLOUTATTR,J),P&&(c.on('click',Ce(c)),c.on('mouseover',Ae(a.graphics,c)),c.on('mouseout',Ee(a.graphics,c))),v.data(GROUPID,S).data(EVENTARGS,t.eventArgs).data(showHoverEffectStr,ke).data(SETROLLOVERATTR,_).data(SETROLLOUTATTR,J),G&&(v.on('click',Ce(v)),v.on('mouseover',Ae(a.graphics,v)),v.on('mouseout',Ee(a.graphics,v))),m.data(GROUPID,S).data(EVENTARGS,t.eventArgs).data(showHoverEffectStr,ke).data(SETROLLOVERATTR,_).data(SETROLLOUTATTR,J),F&&(m.on('click',Ce(m)),m.on('mouseover',Ae(a.graphics,m)),m.on('mouseout',Ee(a.graphics,m))),C.data(GROUPID,S).data(EVENTARGS,t.eventArgs).data(showHoverEffectStr,ke).data(SETROLLOVERATTR,_).data(SETROLLOUTATTR,J),N&&(C.on('click',Ce(C)),C.on('mouseover',Ae(a.graphics,C)),C.on('mouseout',Ee(a.graphics,C))),E.data(GROUPID,S).data(EVENTARGS,t.eventArgs).data(showHoverEffectStr,ke).data(SETROLLOVERATTR,_).data(SETROLLOUTATTR,J),I&&(E.on('click',Ce(E)),E.on('mouseover',Ae(a.graphics,E)),E.on('mouseout',Ee(a.graphics,E))),W.data(GROUPID,S).data(EVENTARGS,t.eventArgs).data(showHoverEffectStr,ke).data(SETROLLOVERATTR,_).data(SETROLLOUTATTR,J),U&&(W.on('click',Ce(W)),W.on('mouseover',Ae(a.graphics,W)),W.on('mouseout',Ee(a.graphics,W))),V.data(GROUPID,S).data(EVENTARGS,t.eventArgs).data(showHoverEffectStr,ke).data(SETROLLOVERATTR,_).data(SETROLLOUTATTR,J),H&&(V.on('click',Ce(V)),V.on('mouseover',Ae(a.graphics,V)),V.on('mouseout',Ee(a.graphics,V))),defined(s.displayValue)&&s.displayValue!==BLANK&&t.showQ3Values?(y=T.label[0],y&&y.show(),L=Be.setAnimation({el:y||'text',attr:t.props.upperQuartileLabel.attr,component:X,label:'text',container:me}),!y&&(T.label[0]=L),T.label[0].data(GROUPID,S)):T.label[0]&&Be.setAnimation({el:T.label[0],component:X,attr:{"text-bound":[]},callback:_hide.call(T.label[0])}),defined(d.displayValue)&&d.displayValue!==BLANK&&t.showMedianValues?(y=T.label[1],y&&y.show(),L=Be.setAnimation({el:y||'text',attr:t.props.medianLabel.attr,component:X,label:'text',container:me}),!y&&(T.label[1]=L),T.label[1].data(GROUPID,S)):T.label[1]&&Be.setAnimation({el:T.label[1],component:X,attr:{"text-bound":[]},callback:_hide.call(T.label[1])}),defined(p.displayValue)&&p.displayValue!==BLANK&&t.showQ1Values?(y=T.label[2],L=Be.setAnimation({el:y||'text',component:X,attr:t.props.lowerQuartileLabel.attr,container:me}),!y&&(T.label[2]=L,L.show()),T.label[2].data(GROUPID,S)):T.label[2]&&Be.setAnimation({el:T.label[2],component:X,attr:{"text-bound":[]},callback:_hide.call(T.label[2])}),ie?(se.enableToolTip(h,r),se.enableToolTip(g,r),se.enableToolTip(c,r),se.enableToolTip(v,r),se.enableToolTip(m,r),se.enableToolTip(C,r),se.enableToolTip(E,r),se.enableToolTip(W,r),se.enableToolTip(V,r)):(se.enableToolTip(h,!1),se.enableToolTip(g,!1),se.enableToolTip(c,!1),se.enableToolTip(v,!1),se.enableToolTip(m,!1),se.enableToolTip(C,!1),se.enableToolTip(E,!1),se.enableToolTip(W,!1),se.enableToolTip(V,!1))}(function(){!1===X.getState('visible')&&(!1===X._conatinerHidden||X._conatinerHidden===UNDEFINED)&&(de.hide(),he.hide(),ce.hide(),be.hide(),ue.hide(),we.hide(),me&&me.hide(),X._conatinerHidden=!0)})(),ve&&X.removePlots()}removePlots(){var e,o,r,a,l,t,s=this,n=s.components,p=n.removeDataArr,d=s.getFromEnv('animationManager'),h=p.length;for(a=0;a<h;a++)if(e=p[0],p.splice(0,1),e&&e.graphics)for(o in r=e.graphics,r)if(o!==LABEL)r[o].shadow({opacity:0}),r[o].hide();else for(l=r[o].length,t=0;t<l;t++)r[o][t]&&(r[o][t].shadow({opacity:0}),d.setAnimation({el:r[o][t],component:s,attr:{"text-bound":[]},callback:_hide.call(r[o][t])}))}removeData(e,o,r){var a=this,l=a.components,t=l.data,i=l.removeDataArr||(l.removeDataArr=[]);o=o||1,e=e||0,e+o===t.length?a.endPosition=!0:(0===e||e===UNDEFINED)&&(a.endPosition=!1),l.removeDataArr=i=i.concat(t.splice(e,o)),r&&a.asyncDraw()}__setDefaultConfig(){super.__setDefaultConfig();let e=this.config;e.showplotborder=UNDEFINED,e.plotborderdashlen=UNDEFINED,e.plotborderdashgap=UNDEFINED,e.plotfillalpha=UNDEFINED,e.useroundedges=UNDEFINED,e.ratio=UNDEFINED,e.plotborderthickness=UNDEFINED,e.showvalues=UNDEFINED,e.valuepadding=UNDEFINED,e.showtooltip=UNDEFINED,e.maxcolwidth=UNDEFINED,e.rotatevalues=UNDEFINED,e.use3dlighting=UNDEFINED,e.whiskerslimitswidthratio=UNDEFINED,e.outliersupperrangeratio=UNDEFINED,e.outlierslowerrangeratio=UNDEFINED,e.showalloutliers=UNDEFINED,e.showmean=UNDEFINED,e.showsd=UNDEFINED,e.showmd=UNDEFINED,e.showqd=UNDEFINED,e.showminvalues=UNDEFINED,e.showmaxvalues=UNDEFINED,e.showq1values=UNDEFINED,e.showq3values=UNDEFINED,e.showmedianvalues=UNDEFINED}getDataLimits(){var e=this,o=e.config,r=e.getState('removed');return{max:r?-Infinity:o.maxValue,min:r?+Infinity:o.minValue}}_addLegend(){var e,o,r,a,l=this,t=l.config,i=l.getFromEnv('legend'),s=t.upperBoxColor,n=t.lowerBoxColor;e=COLOR_000000,o={FCcolor:{color:s+COMMA+n,angle:90,ratio:'50, 0',alpha:'100, 100'}},r={label:getFirstValue(l.config.JSONData.seriesname),index:l.getJSONIndex(),mainDS:!0},t.includeInLegend?(a=i.getItem(l.config.legendItemId),!a&&(l.config.legendItemId=i.createItem(l),a=i.getItem(l.config.legendItemId),l.addExtEventListener('click',function(){a.itemClickFn()},a)),a.configure(r),a.setStateCosmetics('default',{symbol:{fill:toRaphaelColor(o),rawFillColor:t.upperBoxColor,stroke:toRaphaelColor(e)},background:{legendBackgroundColor:toRaphaelColor(s),alpha:20}}),l.getState('visible')?a.removeLegendState('hidden'):a.setLegendState('hidden')):l.config.legendItemId&&i.disposeItem(l.config.legendItemId),l._mapChildren(e=>{e.addToEnv('legendBackgroundColor',s),e&&e._addLegend(!0)})}legendInteractivity(){var e,o,r=this,a=r.getChildren('dataset'),l=r.getState('visible');for(e=l?'hide':'show',o=0;o<(a&&a.length);o++)a[o][e]();r[e]()}drawLabel(){return this}getName(){return'boxandwhisker2D'}childChanged(){return this}show(){super.show()}hide(){super.hide()}}export default BoxAndWhiskerDataset;