/**
 * Created by Erlex
 * 05/15/2019
 * This script requires fontawesome and Bootstrap package
 * fontawesome
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous">
 * Bootstrap
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
 * Sweet Alert
    https://lipis.github.io/bootstrap-sweetalert/
 */
$(document).ready(function () {
    $('.AddScrollToTopButton').html('<a href="javascript:" id="return-to-top" class="hidden-print"><i class="fa fa-chevron-up"></i></a>');
    $(window).scroll(function () {
        if ($(this).scrollTop() >= 50) {        // If page is scrolled more than 50px
            $('#return-to-top').fadeIn(200);    // Fade in the arrow
        } else {
            $('#return-to-top').fadeOut(200);   // Else fade out the arrow
        }
    });

    $('#return-to-top').on("click",function () {      // When arrow is clicked
        $('body,html').animate({
            scrollTop: 0                       // Scroll to top of body
        }, 500);
    });

    $('.rlxEditable').on('dblclick', function () {
        rlxEditable($(this).attr('data-type'),this);
    })
    
    $('input[type="number"]').on('keyup', function () {
        v = parseInt($(this).val());
        min = parseInt($(this).attr('min'));
        max = parseInt($(this).attr('max'));

        if (v < min){
            $(this).val(min);
        } else if (v > max) {
            $(this).val(max);
        }
    })
})

function rlxEditable(Type, ID) {
    var DefaultValue = $(ID).text();
    var newValue = DefaultValue;
    if ($(ID).attr('data-editable') === "true" || !$(ID).attr('data-editable')) {
        $(ID).text('').attr('data-editable', false)
            .append(
                $('<input type="text" class="form-control form-control-sm">')
                    .val(DefaultValue)
                    .on('blur', function () {
                        if ($(this).val()) {
                            newValue = $(this).val();
                        }

                        $(this).parent().text(newValue).attr('data-editable', true);
                        $(this).remove();
                    })
            )
            .children()
            .focus();
    }
}

function rlxURLVariable(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		if (pair[0] == variable) { return pair[1]; }
	}
	return (false);
}

/*
 * Misc Funtions 
 */
function rlxFormatNumber(number, decPlaces, decSep, thouSep) {
    decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
    decSep = typeof decSep === "undefined" ? "." : decSep;
    thouSep = typeof thouSep === "undefined" ? "," : thouSep;
    var sign = number < 0 ? "-" : "";
    var i = String(parseInt(number = Math.abs(Number(number) || 0).toFixed(decPlaces)));
    var j = (j = i.length) > 3 ? j % 3 : 0;

    return sign +
        (j ? i.substr(0, j) + thouSep : "") +
        i.substr(j).replace(/(\decSep{3})(?=\decSep)/g, "$1" + thouSep) +
        (decPlaces ? decSep + Math.abs(number - i).toFixed(decPlaces).slice(2) : "");
}

function rlxLeadingZero(val) {
	val = parseInt(val);
	val = val < 10 ? '0' +val: val;
		//if (parseInt(val) < 10) val = '0' + val;
	return val;

}

function rlxScrollTo(ID) {
	$('html, body').animate({
	scrollTop: $(ID).offset().top
	}, 1000);
}

/// Searchable Select
/*
 ex: 
 <input type="text" placeholder="Workschedule Template" class="form-control rlxSearchable" data-target="List"/>
 <select class="custom-select mt-3 WorkScheduleTemplateList" id="List" size="22">
    <option value="1">Data1</option>
    <option value="2">Data2</option>
    <option value="3">Data3</option>
    <option value="4">Data4</option>
 </select>
 */
$(".rlxSearchable").on("keyup", function () {
	var value = $(this).val().toLowerCase();
	var Target = $(this).attr('data-target');
	$("#" + Target).children().filter(function () {
		$(this).toggle($(this).text().toLowerCase().indexOf(value) > - 1)
		});
});
/* 
 * Date Time functions
 * 
*/

/*
    ex: rlxformatDate(New Date)
    Format date to: yyyy-MM-dd
    Parameter
        - Date(Optional)
 */
function rlxformatDate(date,Type) {
	var d;
	if (date) d = new Date(date);
	else d = new Date();

	var month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear();

	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;

	if (Type == 1) {
	    return [month, day ,year].join('-');
	} else return [year, month, day].join('-');
}

function rlxformatTimeAMPM(date) {
	if (date) date = new Date(date);
	else date = new Date();

	var hours = date.getHours();
	var minutes = date.getMinutes();
	var ampm = hours >= 12 ? 'PM' : 'AM';
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	var strTime = rlxLeadingZero(hours) + ':' + rlxLeadingZero(minutes) + ' ' + ampm;
	return strTime;
}

function rlxformatTimeMilitary(date) {
    if (date) date = new Date(date);
    else date = new Date();

    var strTime = rlxLeadingZero(date.getHours()) + ':' + rlxLeadingZero(date.getMinutes());
    return strTime;
}

function rlxGetDay(Index) {
	var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	return days[Index];
}

function rlxDateAdd(date, unit, value) {
    if (date) date = new Date(date);
    else date = new Date();
    switch (unit.toLowerCase()) {
        case 'mm': date.setMilliseconds(date.getDate() + value); break;
        case 'sec': date.setSeconds(date.getDate() + value); break;
        case 'min': date.setMinutes(date.getDate() + value); break;
        case 'hour': date.setHours(date.getDate() + value); break;
        case 'day':date.setDate(date.getDate() + value); break;
        case 'month ': date.setMonth(date.getDate() + value); break;
        case 'year': date.setFullYear(date.getDate() + value); break;
        default:
            console.warn("rlxDateAdd() not supported!");
    }

    return date;
}

function rlxIntToTime(n) {
    var num = n || 0;
    var hours = (num / 60);
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);

   
    console.log(n)
    if (rhours > 0) return rhours + " hour(s) and " + rminutes + " minute(s)";
    else if (rminutes > 0) return rminutes + " minute(s)";
    else return '';
}

/*
 * Loading functions
 * fx/async http load
 */

/*
  Req = URL link
  callbackfunction(optional) = function to perform after loading, callbackfunction(Data)
  ex: rlxJSON_GET('http://sample.com?data1=data', superfunction);
 */
function rlxJSON_GET(Req, callbackfunction) {
    var Data = [];
    try {
	    $.get(Req, function (data, status) {
			    //Data = data;
		        Data = data.data || data; /// special case for HROS ONLY
		        if (callbackfunction) callbackfunction(Data);
	    }).done(function () {
	          //console.log("second success");
	      })
          .fail(function () {
              //console.log("error");
              callbackfunction(Data,'error');
          })
          .always(function () {
              //console.log("finished");
          });
    } catch (e) {
        console.error('rlxJSON_GET ' + e.message);
    }
	return Data;
}

function rlxJSON_POST(Req, FormID , callbackfunction) {
    var form = $(FormID);

    var formdata = false;
    if (window.FormData) {
        formdata = new FormData(form[0]);
    }

    var formAction = form.attr('action');
    $.ajax({
        url: Req,
        data: formdata ? formdata : form.serialize(),
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        success: function (data, textStatus, jqXHR) {
            callbackfunction(data, textStatus, jqXHR);
        }
    });
}

/*
  Truncate element child and Add loading animation
  supports <tbody>, <select>
  ID = selector(can be class name or element id)
 ex: rlxTruncateAddLoading(ID)

 * Required font awesome and bootstrap4!
 */
function rlxTruncateAddLoading(ID) {
    if (ID) {
        var Type = ($(ID).prop('tagName')).toLowerCase();
        rlxTruncateElement(ID)
        switch (Type) {
            case 'tbody':
                $(ID).append($('<tr>')
                        .append($('<td colspan="10" class="text-center">')
                            .append('<i class="fa fa-spinner fa-pulse fa-fw"></i> Loading...')));

                /*.append($('tr')
                        .append($('td')
                            .addClass('text-center')
                            .append('<i class="fa fa-spinner fa-pulse fa-fw"></i> Loading...')));*/
                            
                break;
            case 'select':
                $(ID).append($('option').text('Loading...'));
                break;
            case 'div':
                $(ID).append('<div class="loading text-center"><br /><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i><br />Loading...</div>');
                break;
            case 'span':
                $(ID).append('<div class="loading text-center"><br /><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i><br />Loading...</div>');
                break;
            default:
                console.warn('rlxTruncateAddLoading() ' + Type + ' not supported.');
        }
    } else {
        console.error('rlxTruncateAddLoading() ID not specified');
    }
}

function rlxTruncateAddError(ID,msg) {
    if (ID) {
        var Type = ($(ID).prop('tagName')).toLowerCase();
        rlxTruncateElement(ID)
        switch (Type) {
            case 'tbody':
                $(ID).append($('<tr>')
                        .append($('<td colspan="10" class="text-center bg-danger text-light">')
                            .append('<i class="fas fa-exclamation-triangle"></i> ' + (msg || 'An error encountered') )));
                break;
            case 'select':
                $(ID).append($('option').text('An error encountered.'));
                break;
            case 'div':
                $(ID).append(`<div class="card mt-3">
  	                            <div class ="card-header bg-danger text-white"><i class ="fas fa-exclamation-triangle"></i> An error encountered.</div>
                                <div class ="card-body"> ` +(msg || 'An error encountered') +` </div>
                              </div>`);
                break;
            default:
                console.warn('rlxTruncateAddLoading() ' + Type + ' not supported.');
        }
    } else {
        console.error('rlxTruncateAddLoading() ID not specified');
    }
}


function rlxAddLoadingAnimation(ID) {
    $(ID).append('<div class="text-center"><i class="fa fa-spinner fa-pulse fa-fw"></i> Loading...</div>');
}

function rlxTruncateElement(ID) {
    if (ID) $(ID).children().remove();
    else console.warn('rlxTruncateElement() Element not found!');
}

function rlxFormToJSON(ID) {
    var result = {};
    $.each($(ID).serializeArray(), function () {
        result[this.name] = this.value;
    });

    return result;
}

// Add loading to Tbody element, this function requires Font Awesome
function rlxaddLoading_TBody(ID) {
    Truncate_TBody(ID);
    //$(ID).append('<tr><td colspan="10" class="text-center"><i class="fa fa-spinner fa-pulse fa-fw"></i> Loading...</td></tr>');
    $(ID).append($('<tr>').append(rlxLoading($('<td colspan="10" class="text-center">'))));
}

function rlxTruncate_TBody(ID) {
    $(ID).find('tr').remove().end();
}

function rlxLoadFullPage(URL, Destination) {
var MainContent = Destination;
    try {
	    $(MainContent).load(URL + " #AnythingNotPartOfTheDoc", function (responseTxt, statusTxt, xhr) {
		    $(LoadingPlaceHolder).hide();

		    if (statusTxt === "success") {
			    $(MainContent).html($(xhr.responseText).find(MainContent));
			    $("html, body").animate({ scrollTop: 0 }, 500);

		    } else if (statusTxt === "error") {
			    $(MainContent).append('<div class="card" id="ErrorPlaceHolder"><div class="card-header bg-danger text-white">An unexpected error encountered!<br /> ' +JSON.stringify(xhr) + '</div><div class="card-body" id="ErrorBody"></div></div>');
	    }

	    }).fadeIn("slow"); //*/
    } catch (e) {
	    console.error("loadPage.ERROR! " +e.message);
	    $(MainContent).append('<div class="card" id="ErrorPlaceHolder"><div class="card-header bg-danger text-white">An unexpected error encountered!<br /> ' +e.message + '</div><div class="card-body" id="ErrorBody"></div></div>');
    }
}

function rlxLoadPage(URL, PartToBeLoaded, Destination, callback) {
    var MainContent = Destination;
    try {
	    $(MainContent).load(URL, function (responseTxt, statusTxt, xhr) {
		    if (statusTxt === "success") {
			    //$(MainContent).html($(xhr.responseText).find(PartToBeLoaded));
			    //$(MainContent).append('<div class="card" id="ErrorPlaceHolder"><div class="card-header bg-danger text-white">An unexpected error encountered!</div><div class="card-body" id="ErrorBody">asdasda</div></div>');
		    } else if (statusTxt === "error") {
			    $(MainContent).html('').append('<div class="card" id="ErrorPlaceHolder"><div class="card-header bg-danger text-white">An unexpected error encountered!</div><div class="card-body" id="ErrorBody">' +JSON.stringify(xhr) + '</div></div>');
	    }

		    callback();
    });
    } catch (e) {
	    console.error('rlxLoadPage() ERROR!' +e.message);
	    $(MainContent).append('<div class="card" id="ErrorPlaceHolder"><div class="card-header bg-danger text-white">An unexpected error encountered!<br /> ' +e.message + '</div><div class="card-body" id="ErrorBody"></div></div>');
    }
}

function rlxSetChecked(ID, VALUE) {
    try {
        if (!ID) { console.warn('rlxSetChecked() ID parameter not found!'); return false; }

        if (VALUE === "on" || VALUE == "1" || VALUE == true)
            $(ID).prop('checked', true);
        else
            $(ID).prop('checked', false);

        $(ID).trigger("change")

    } catch (e) {
        console.error("rlxSetChecked() ERROR! " + e.message);
    }
}

function rlxSetRadio(ID, VALUE) {
    
}


function rlxSetInputValue(ID, VALUE, DEFAULT, isReadOnly) {
    try {
        if (!ID) { console.warn('rlxSetInputValue() ID parameter not found!'); return false; }

        $(ID).val(VALUE || DEFAULT).prop('readonly', isReadOnly || false);


    } catch (e) {
        console.error("rlxSetInputValue() ERROR! " + e.message);
    }
}
/*
 * source: https://stackoverflow.com/questions/19382872/how-to-connect-html-divs-with-lines
 * sample: https://jsfiddle.net/axy_0314/pvry3bL8/
 */
function rlxDrawLinefunction(from, to, line){
    console.log('rlxDrawLinefunction(' + from + ',' + to + ',' + line + ')')
    var fT = from.offsetTop  + from.offsetHeight/2;
    var tT = to.offsetTop 	 + to.offsetHeight/2;
    var fL = from.offsetLeft + from.offsetWidth/2;
    var tL = to.offsetLeft 	 + to.offsetWidth/2;
  
    var CA   = Math.abs(tT - fT);
    var CO   = Math.abs(tL - fL);
    var H    = Math.sqrt(CA*CA + CO*CO);
    var ANG  = 180 / Math.PI * Math.acos( CA/H );

    if(tT > fT){
        var top  = (tT-fT)/2 + fT;
    }else{
        var top  = (fT-tT)/2 + tT;
    }
    if(tL > fL){
        var left = (tL-fL)/2 + fL;
    }else{
        var left = (fL-tL)/2 + tL;
    }

    if(( fT < tT && fL < tL) || ( tT < fT && tL < fL) || (fT > tT && fL > tL) || (tT > fT && tL > fL)){
        ANG *= -1;
    }
    top-= H/2;

    line.style["-webkit-transform"] = 'rotate('+ ANG +'deg)';
    line.style["-moz-transform"] = 'rotate('+ ANG +'deg)';
    line.style["-ms-transform"] = 'rotate('+ ANG +'deg)';
    line.style["-o-transform"] = 'rotate('+ ANG +'deg)';
    line.style["-transform"] = 'rotate('+ ANG +'deg)';
    line.style.top    = top+'px';
    line.style.left   = left+'px';
    line.style.height = H + 'px';
}



// Async function
function rlxReadTextFile(file,CallBack, TYPE) {
    var Result = "";
    if (!TYPE) TYPE = "UTF-8";

    if (file) {
        getAsText(file);
    } else {
        return "";
    }

    

    function getAsText(readFile) {
        var reader = new FileReader();

        // Read file into memory as UTF-16
        reader.readAsText(readFile, TYPE);

        // Handle progress, success, and errors
        reader.onprogress = updateProgress;
        reader.onload = loaded;
        reader.onerror = errorHandler;
    }

    function updateProgress(evt) {
        if (evt.lengthComputable) {
            // evt.loaded and evt.total are ProgressEvent properties
            var loaded = (evt.loaded / evt.total);
            if (loaded < 1) {
                console.log(loaded);
                // Increase the prog bar length
                // style.width = (loaded * 200) + "px";
            }
        }
    }

    function loaded(evt) {
        // Obtain the read file data
        var fileString = evt.target.result;
        Result = fileString;
        if(CallBack) CallBack(fileString);
        
    }

    function errorHandler(evt) {
        if (evt.target.error.name == "NotReadableError") {
            // The file could not be read
        }
        console.error(evt)
    }

    return Result;
}

function rlxGetFileInfo(file, CallBack, TYPE) {
    var Result = "";
    if (!TYPE) TYPE = "UTF-8";

    if (file) {
        getAsText(file);
    } else {
        return "";
    }

    function getAsText(readFile) {
        var reader = new FileReader();

        // Read file into memory as UTF-16
        reader.readAsText(readFile, TYPE);

        // Handle progress, success, and errors
        reader.onprogress = updateProgress;
        reader.onload = loaded;
        reader.onerror = errorHandler;
    }

    function updateProgress(evt) {
        if (evt.lengthComputable) {
            // evt.loaded and evt.total are ProgressEvent properties
            var loaded = (evt.loaded / evt.total);
            if (loaded < 1) {
                console.log(loaded);
                // Increase the prog bar length
                // style.width = (loaded * 200) + "px";
            }
        }
    }

    function loaded(evt) {
        if (CallBack) CallBack(evt.target);

    }

    function errorHandler(evt) {
        if (evt.target.error.name == "NotReadableError") {
            // The file could not be read
        }
        console.error(evt)
    }

    return Result;
}

//Source: https://codepen.io/danny_pule/pen/WRgqNx
function rlxExportCSVFile(headers, items, fileTitle, CallBack) {
    if (headers) {
        items.unshift(headers);
    }

    // Convert Object to JSON
    var jsonObject = JSON.stringify(items);

    var csv = this.rlxConvertToCSV(jsonObject);

    var exportedFilenmae = fileTitle  + '.csv' || 'export.csv';

    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, exportedFilenmae);
        if (CallBack) CallBack();
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", exportedFilenmae);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            if (CallBack) CallBack();
        }
    }
}

function rlxConvertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','

            line += array[i][index];
        }

        str += line + '\r\n';
    }

    return str;
}

function replaceAt(str, index, ch) {
    //return str.replace(/./g, (c, i) => i == index ? ch : c)
    return str.replace(new RegExp(`^(.{${index}})(.)`), `$1${ch}`);
}
//https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
// Sorting object array
//objs.sort((a,b) => (a.last_nom > b.last_nom) ? 1 : ((b.last_nom > a.last_nom) ? -1 : 0)); 

//Finding Index
//var selectedItem = array.findIndex(obj => obj.index == lookupIndex);

//check if existing on string
//string.includes("lookup");

//Loop to elements
/*
    $('.intMinsLate').each(function () {
        var NoOfLate = $(this).text().trim() != '' ?
        rlxIntToTime(parseInt($(this).text())) + ' late'
        : '';
        $(this).text(NoOfLate)
    });
 */

//C#
/*
* web config
<add name="dbAttendance" providerName="System.Data.SqlClient" connectionString="data source=edscloudserversng.cgemck5cc0k3.ap-southeast-1.rds.amazonaws.com;initial catalog=AMPS_FACE_DEMO;persist security info=True;user id=edsinnoventions;password=11eds2000;MultipleActiveResultSets=True;" />

* controller
    private JsonResult QueryToJson(string QUERY,string ErrorReturn = null)
    {
        var model = new GenericReturn();
        try
        {
            string connectionString = ConfigurationManager.ConnectionStrings["dbAttendance"].ConnectionString;
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                SqlCommand sqlCMD = new SqlCommand(QUERY, conn);
                conn.Open();
                JavaScriptSerializer j = new JavaScriptSerializer();
                model.data = j.Deserialize(sqlDatoToJson(sqlCMD.ExecuteReader()), typeof(object));
            }
        }
        catch (Exception e)
        {
            if (ErrorReturn == null) model.data = e.Message;
            else model.data = ErrorReturn;
        }

        return Json(model, JsonRequestBehavior.AllowGet);
    }

    private string sqlDatoToJson(SqlDataReader dataReader)
    {
        var dataTable = new System.Data.DataTable();
        dataTable.Load(dataReader);
        string JSONString = string.Empty;
        JSONString = JsonConvert.SerializeObject(dataTable);

        return JSONString;
    }
* model
 public class GenericReturn
 {
    public object data { get; set; }
 }
 */
