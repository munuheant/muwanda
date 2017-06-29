//client jquery app server
var url = "http://localhost:8080/api/4TKF6497KF95H03WG/XZS874H5DDS609KL/";
var App = {
  initialize:function(){
    $.ajax({                                  url: url+"person/698",
      type: "post",
      data: {'auth':'0i6fudj24'} ,
      success: function (res) {
        alert(res);
        $('#container').html(JSON.string
ify(res));
      },
      error: function(jqXHR, textStatus,
 error) {                                         $('#container').html(error);
      }
    });
  }
};
$(function() { 
  alert('stated');
  App.initialize();
});
