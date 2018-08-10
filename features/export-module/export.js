import{extend2,PROJECT_VERSION,pluckNumber,pluck}from'../../_internal/lib/lib';import{RGBtoHex}from'../../_internal/lib/lib-graphics';import FCExtensionInterface from'../../core/component-interface';import{downloadCharts,browserDetails,drawSvgOnCanvas,isCanvasElemSupported}from'../../_internal/lib/lib-svg-to-canvas';import{JpegToPdf,addImage,getDataUrl}from'../../_internal/misc/jpeg-to-pdf';import{EXPORTACTION,EXPORTMODE,EXPORTFORMAT,LOGMODE,createExportActionOldString,cacheAllImages,makeImageUrlsAbsolute,embedImagesWithNonDataURL,replaceImagesWithNonDataUrl,hasUndownloadableImage,logCharts,svgStrToDataUrl}from'../../_internal/misc/export-utils';let isObject=a=>'object'==typeof a,getBackgroundColor=a=>{let b=pluckNumber(a.options.containerBackgroundOpacity,1);return a.jsVars.transparent||0===b?'':a.options.containerBackgroundColor||'#FFFFFF'},getBackgroundAlpha=a=>a.jsVars.transparent?0:pluckNumber(a.options.containerBackgroundOpacity,1)+'',IMAGEDATA='IMAGE-DATA',xAttrRegx=/\s\bx\b=['"][^'"]+?['"]/ig,yAttrRegx=/\s\by\b=['"][^'"]+?['"]/ig,win=window,doc=win.document,DEFAULT_EXPORT_URL='https:'===win.location.protocol?'https://export.api3.fusioncharts.com/':'http://export.api3.fusioncharts.com/',DEFAULT_LOG_URL='https:'===win.location.protocol?'https://export.api3.fusioncharts.com/api/v1.0/logs':'http://export.api3.fusioncharts.com/api/v1.0/logs',isIOS=win.navigator.userAgent.match(/ (iPad|iPhone|iPod)/g);export default class ExportModule extends FCExtensionInterface{constructor(){super(),this.config={exportOption:{},chartConfig:{caption:'',subcaption:'',width:'',height:''}}}getName(){return'exportModule'}getType(){return'extension'}configureMenuBar(a){let b,c,d,e,f,g,h,j,k=this,l=!!win.btoa,m=k.getFromEnv('chart-attrib').exportformats,n={PNG:'Export As '+EXPORTFORMAT.PNG.toUpperCase(),JPG:'Export As '+EXPORTFORMAT.JPG.toUpperCase(),PDF:'Export As '+EXPORTFORMAT.PDF.toUpperCase(),SVG:'Export As '+EXPORTFORMAT.SVG.toUpperCase(),XLS:'Export As '+EXPORTFORMAT.XLS.toUpperCase()},o=[];if(k.config.exportOption.exportenabled){if(g=function(a){return function(){k.config.exportOption.exportformat=a,k.exportChart({})}},m)for(b=m.split('|'),e=0,f=b.length;e<f;e++)c=b[e].split('='),d=c[0].toUpperCase(),n[d]&&(n[d]=c[1]||n[d]),n[d]&&(j||(j={}))&&(j[d]=!0);for(d in n)('XLS'!==d||l)&&(!j||j[d])&&(h={},h[n[d]]={handler:g(d),action:'click'},o.push(h));a.appendAsList(o)}}configure(a){let b=this.getFromEnv('chartMenuList'),c=this.getFromEnv('chartInstance'),d=this.config,e=d.chartConfig,f=d.exportOption;a=a.chartConfig,a.caption&&(e.caption=pluck(a.caption,'')),a.subcaption&&(e.subcaption=pluck(a.subcaption,'')),f.exportenabled=pluckNumber(a.exportenabled,0),f.exportshowmenuitem=pluckNumber(a.exportshowmenuitem,1),f.exportformat=pluck(a.exportformat,EXPORTFORMAT.PNG),f.exporthandler=pluck(a.html5exporthandler,a.exporthandler,DEFAULT_EXPORT_URL),f.exportaction=function(){let b;return a.exportaction&&'string'==typeof a.exportaction?(b=a.exportaction.toLowerCase(),0<=[EXPORTACTION.DOWNLOAD,EXPORTACTION.SAVE,EXPORTACTION.DOWNLOADSAVE].indexOf(b)?b:EXPORTACTION.DOWNLOAD):EXPORTACTION.DOWNLOAD}(),f.exporttargetwindow=pluck(a.exporttargetwindow,isIOS?'_blank':'_self'),f.exportfilename=pluck(a.exportfilename,'FusionCharts'),f.exportparameters=pluck(a.exportparameters,''),f.exportcallback=pluck(a.exportcallback,''),f.exportwithimages=pluckNumber(a.exportwithimages,1),f.exportmode=function(){let b;return'undefined'!=typeof a.exportatclientside&&(b={1:EXPORTMODE.AUTO,0:EXPORTMODE.AUTO}[a.exportatclientside]),b=a.exportmode||b||EXPORTMODE.AUTO,b=b.toLowerCase(),b}(),f.logenabled=pluckNumber(a.logenabled,0),f.loghandler=pluck(a.html5loghandler,a.loghandler,DEFAULT_LOG_URL),f.logmode=function(){let b=a.logmode;return'undefined'!=typeof b&&'string'==typeof b&&b.toUpperCase()in LOGMODE?LOGMODE[b.toUpperCase()]:LOGMODE.AUTO}(),f.bgcolor=getBackgroundColor(c),f.bgalpha=getBackgroundAlpha(c),f.exportshowmenuitem&&b&&this.configureMenuBar(b)}exportChart(a){let b,c,d,e,f=this.getFromEnv('chartInstance'),g=this.getFromEnv('chart'),h=this.config.exportOption,i=isObject(a)&&function(a){let b,c={};for(b in a)c[b.toLowerCase()]=a[b];return c}(a)||{},j=extend2(extend2({},h),i),k=(j.exportformat||EXPORTFORMAT.PNG).toLowerCase(),l=j.exporthandler,m=j.exportaction,n=j.exporttargetwindow||'',o=j.exportfilename,p=j.exportparameters,q=j.exportcallback,r=j.exportwithimages,s=j.exportmode,t=j.logenabled,u=j.loghandler,v=j.logmode,w=this;g.fireChartInstanceEvent('beforeExport',j,e,function(){let a,h,i,x,y,z,A,B=f.id,C=w.config.chartConfig.caption,D=w.config.chartConfig.subcaption,E=this.apiInstance.getFromEnv('paper'),F=this.apiInstance.getFromEnv('core-options')['export'].useCanvas,G=g.getChildren('chartMenuBar'),H=isCanvasElemSupported(),I={DOMId:B,height:E.height,width:E.width,fileName:o+'.'+k,statusCode:e,statusMessage:e,notice:e},J={exportAction:m,exportTargetWindow:n,exportCallback:q,fusionCharts:f,paper:E,chartId:B,exportHandler:l,logEnabled:t,logMode:v,logHandler:u},K=function(a,b,c){let d,e,g,h;return c=c||m,d=m,e=createExportActionOldString(m),g=['exportfilename='+o,'exportformat='+k,'exportaction='+e,'exportactionnew='+d,'configuredexportaction='+c,'exportparameters='+p].join('|'),h=!!t,v===LOGMODE.CLIENT&&(h=!1),{charttype:f.chartType(),stream_type:a||'',stream:b||'',meta_bgColor:j.bgcolor||'',meta_bgAlpha:j.bgalpha||'1',meta_DOMId:f.id,meta_width:E.width||w.config.chartConfig.width,meta_height:E.height||w.config.chartConfig.height,chart_caption:C,chart_sub_caption:D,is_single_export:!0,is_full_version:!1,version:PROJECT_VERSION,user_time_zone:-new Date().getTimezoneOffset(),log_enabled:h,parameters:g}},L=function(){let a=m;return{chartType:f.chartType(),chartCaption:C,chartSubCaption:D,isSingleExport:!0,isFullVersion:!1,exportAction:a,userTimeZone:-new Date().getTimezoneOffset(),exportFileName:[o,k].join('.'),exportFormat:k,version:PROJECT_VERSION}},M=function(a){let b=K(EXPORTFORMAT.SVG,a);downloadCharts(null,null,null,b,J)},N=function(a){let b,c,d=hasUndownloadableImage(a);browserDetails.hasCanvas&&'undefined'!=typeof win.btoa?(b=doc.createElement('canvas'),b.width=E.width,b.height=E.height,a=embedImagesWithNonDataURL(a),i=replaceImagesWithNonDataUrl(i),d||k===EXPORTFORMAT.SVG?(c=K(EXPORTFORMAT.SVG,a),downloadCharts(null,null,null,c,J)):drawSvgOnCanvas({svg:i,canvas:b,x:0,y:0,width:E.width,height:E.height,useCanvas:F},function(){let a;switch(k){case EXPORTFORMAT.PNG:a=b.toDataURL('image/png');break;case EXPORTFORMAT.JPEG:a=b.toDataURL('image/jpeg');break;case EXPORTFORMAT.PDF:JpegToPdf(E.height,E.width),addImage(b.toDataURL('image/jpeg')),a=getDataUrl();break;default:a=b.toDataURL('image/jpeg');}c=K(IMAGEDATA,a),downloadCharts(null,null,null,c,J)})):M(a)},O=function(a,b,c){let d;d=doc.createElement('canvas'),d.width=E.width,d.height=E.height,drawSvgOnCanvas({svg:i,canvas:d,x:0,y:0,width:E.width,height:E.height,useCanvas:F},function(){switch(a){case EXPORTFORMAT.PNG:b(a,d.toDataURL('image/png'),o,c);break;case EXPORTFORMAT.JPEG:b(a,d.toDataURL('image/jpeg'),o,c);break;case EXPORTFORMAT.PDF:b(a,d.toDataURL('image/jpeg'),o,c);break;default:b(a,d.toDataURL('image/jpeg'),o,c);}})},P=function(b,c,d,e,f){b===EXPORTFORMAT.PDF&&(JpegToPdf(E.height,E.width),addImage(c),c=getDataUrl()),a=f===EXPORTMODE.AUTO?K(IMAGEDATA,c):null,downloadCharts('url',c,d+'.'+b,a,e)},Q=function(a,b,c){let d,e;k===EXPORTFORMAT.SVG?(d=svgStrToDataUrl(a),c(d,b)):(e=function(){c(arguments[1],b)},O(k,e,b))},R=function(b,c,d){let e,f,g;e=o+'.'+k,k===EXPORTFORMAT.SVG?(f=svgStrToDataUrl(b),a=d===EXPORTMODE.AUTO?K(IMAGEDATA,f):null,downloadCharts('url',f,e,a,c)):(g=function(){P(arguments[0],arguments[1],arguments[2],arguments[3],d)},O(k,g,c))},S=function(){let a=0;b=[],c.replace(/[^\r\n]+/g,function(c){b[a]=[],b[a]=c.split(',').map(function(a){return a.replace(/"/g,'')}),a+=1})},T=function(){function a(){let a,c,d,e,f,g,h;if(!b.length)return'';for(a='<table align=\'center\' >',e=0,h=b.length;e<h;e+=1)if(0===e){for(c='<thead valign=\'top\'><tr>',f=0,g=b[e].length;f<g;f+=1)c+='<th>'+b[e][f]+'</th>';c+='</tr></thead>',d='<tbody>'}else{for(d+='<tr>',f=0,g=b[e].length;f<g;f+=1)d+='<td>'+b[e][f]+'</td>';d+='</tr>'}return d+='</tbody>',a+c+d+'</table>'}return'data:application/vnd.ms-excel;base64,'+function(a){return win.btoa(win.unescape(encodeURIComponent(a)))}('<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML//EN"><html xmlns:o=\'urn:schemas-microsoft-com:office:office\'xmlns:x=\'urn:schemas-microsoft-com:office:excel\'xmlns=\'http://www.w3.org/TR/REC-html40\'><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></head><body>'+a()+'</body></html>')},U=function(a){g.fireChartInstanceEvent('exportDataReady',a)},V=function(a){a===LOGMODE.CLIENT&&logCharts(L(),J)};if('xls'===k){if('undefined'!=typeof win.btoa)c=f.getCSVData();else return g.fireChartInstanceEvent('exportCancelled',j),!1;U(),S(),d=T(),y='undefined'!=typeof win.btoa&&('Chrome'===browserDetails.name||'Firefox'===browserDetails.name||'Edge'===browserDetails.name||'ie'===browserDetails.name),y?((m===EXPORTACTION.DOWNLOAD||m===EXPORTACTION.DOWNLOADSAVE)&&(downloadCharts('url',d,o+'.'+k,null,J),g.fireChartInstanceEvent('exported',I)),m===EXPORTACTION.SAVE||m===EXPORTACTION.DOWNLOADSAVE?(z=m,m===EXPORTACTION.DOWNLOADSAVE&&(m=EXPORTACTION.SAVE),a=K(IMAGEDATA,d,z),downloadCharts(null,null,null,a,J),V(v)):v!==LOGMODE.SERVER&&logCharts(L(),J)):(a=K(IMAGEDATA,d),downloadCharts(null,null,null,a,J),V(v))}else x=G.config.group,x.attr('visibility','hidden'),h=E.toSVG(r),i=E.toSVG(r&&H),x.attr('visibility','visible'),h=h.replace(/(\sd\s*=\s*["'])[M\s\d\.]*(["'])/ig,'$1M 0 0 L 0 0$2'),h=h.replace(/NS\d+:/gi,'xlink:'),i=i.replace(/NS\d+:/gi,'xlink:'),i=i.replace(/(\sd\s*=\s*["'])[M\s\d\.]*(["'])/ig,'$1M 0 0 L 0 0$2'),i=i.replace(/(xlink:title\s*=\s*)['"].*["']/ig,''),h=h.replace(/[\w\-]+\=\"undefined\"/ig,''),h=h.replace(/(xlink:title\s*=\s*)['"].*["']/ig,''),h=h.replace(/rgba\(([^\)]+)\)/ig,function(a){return'#'+new RGBtoHex(a.split(','))}),h=h.replace(/<svg[^>]+/i,function(a){return!a.match(/height/i)&&(E.height||w.config.chartConfig.height)&&(a+=' height="'+(E.height||w.config.chartConfig.height)+'"'),!a.match(/width/i)&&(E.width||w.config.chartConfig.width)&&(a+=' width="'+(E.width||w.config.chartConfig.width)+'"'),a}),h=h.replace(/(([\w]+\-)?opacity\s*=\s*)['"][\d\.]+e[\-\+][\d]+["']/ig,'$1"0.001"'),h=h.replace(/(([\w]+\-)?opacity\s*:\s*)[\d\.]+e[\-\+][\d]+/ig,'$10.001'),h=h.replace(/<text[^\>]+/ig,function(a){return a=a.replace(/stroke\=[\"\']([a-z0-9\#]+)?[\"\']/ig,''),a=a.replace(/stroke\s*\:\s*([a-z0-9\#]+)?;?/ig,''),a=a.replace(/stroke-width\=[\"\']([a-z0-9\#]+)?[\"\']/ig,''),a=a.replace(/stroke-width\s*\:\s*([a-z0-9\#]+)?;?/ig,''),a=a.replace(/stroke-opacity\=[\"\']([a-z0-9\#]+)?[\"\']/ig,''),a=a.replace(/stroke-opacity\s*\:\s*([a-z0-9\#]+)?;?/ig,''),a=a.replace(/(<text[^\>]+fill\=)([\"\'][^\"\']+[\"\'])([^\>]+)/ig,'$1$2 stroke=$2 stroke-width="0.2"$3'),a=a.replace(/(<text[^\>]+fill-opacity\=)([\"\'][^\"\']+[\"\'])([^\>]+)/ig,'$1$2 stroke-opacity=$2 $3'),a}),h=h.replace(/<(\b[^<>s\s]+\b)[^\>]+?opacity\s*=\s*['"][^1][^\>]+?(\/>|>[\s\r\n]*?<\/\1>)/ig,function(a,b){let c,d=xAttrRegx.exec(a)||'',e=yAttrRegx.exec(a)||'';return c=' opacity="1" stroke-opacity="1" fill="#cccccc" stroke-width="0" r="0"',c+=' height="0.5" width="0.5" d="M 0 0 L 1 1" />',a+'<'+b+d+e+c}),h=makeImageUrlsAbsolute(h),i=makeImageUrlsAbsolute(i),A=s===EXPORTMODE.SERVER,cacheAllImages(h,A,function(){a=K(EXPORTFORMAT.SVG,h),U(a),a=null;let b,c='undefined'!=typeof win.btoa&&('Chrome'===browserDetails.name||'Firefox'===browserDetails.name||'Edge'===browserDetails.name||'ie'===browserDetails.name),d=hasUndownloadableImage(h);(s===EXPORTMODE.CLIENT||s===EXPORTMODE.AUTO&&!d)&&c?(i=replaceImagesWithNonDataUrl(i),(m===EXPORTACTION.DOWNLOAD||m===EXPORTACTION.DOWNLOADSAVE)&&(R(i,J,s),g.fireChartInstanceEvent('exported',I)),m===EXPORTACTION.SAVE||m===EXPORTACTION.DOWNLOADSAVE?(b=m,m===EXPORTACTION.DOWNLOADSAVE&&(m=EXPORTACTION.SAVE),Q(i,J,function(c,d){a=K(IMAGEDATA,c,b),downloadCharts(null,null,null,a,d),V(v)}),g.fireChartInstanceEvent('exported',I)):v!==LOGMODE.SERVER&&logCharts(L(),J)):s===EXPORTMODE.AUTO?(N(h),V(v)):s===EXPORTMODE.SERVER&&(M(h),V(v))})},function(){g.fireChartInstanceEvent('exportCancelled',j)})}}