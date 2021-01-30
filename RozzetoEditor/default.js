//マウスダウンの位置
var pos1;
var pos2;

//要素位置の修正値
var posX1;
var posY1;

var current_btn = null;

function create_btn(id_val, top_val, left_val){
    var button = $("<button></button>",{
        css: {top: top_val, left: left_val},
        id: id_val,
        addClass: "btn btn-primary rozetto",
        on:{
            //ドラッグ開始
            mousedown: function(evt){
                pos1 = $(this).position();
                posX1 = evt.clientX - pos1.left;
                posY1 = evt.clientY - pos1.top;

                $(this).addClass("drag_flg");
                $(this).css("opacity", "0.8");

                current_btn = $(this);
            },

            //ドラッグ解除
            mouseup: function(evt){
                $(this).removeClass("drag_flg");
                $(this).css("opacity", "1");
                current_btn = null;
            }
        }
    });

    button.html(id_val);
    return button;
}

$(function(){
    $("#add_new").on("click", function(){
        var ret = $("#rozzeto_id").val();
        if(ret == null){return;}

        var button = create_btn(ret, "50%", "50%");
        $("#box").append(button);
    });

    $(document).mousemove(function(evt){
        if(current_btn == null){return;}
        current_btn.css("left", (evt.clientX - posX1));
        current_btn.css("top", (evt.clientY - posY1));
    });

});