function SetPaging(currentIndex, totalPageCount, pagingUrl){       
    if(totalPageCount == 0){
        jQuery("#Paging").hide();
        return;
    }
    var pagingDeviation = 2;
    var diff = currentIndex - pagingDeviation;       
    var startIndex = currentIndex > 0 ? (diff < 1 ? 1 : diff) : 1
    var ulHtml = "";
    if(currentIndex > 1){
        ulHtml += "<li><a href='" + pagingUrl + "?page=" + (currentIndex - 1) + "'>" + "«" + "</a></li>";
    }
    
    for(var i = startIndex; i <= totalPageCount; i++){
        var li = "<li><a href='" + pagingUrl + "?page=" + i + "'>" + i + "</a></li>";
        if(i == currentIndex){
            li = "<li class='active'><a href='" + pagingUrl + "?page=" + i + "'>" + i + "</a></li>";
        }
        ulHtml += li;    
        if(i - currentIndex >= pagingDeviation)
            break;                 
    }
    if(currentIndex < totalPageCount){
        ulHtml += "<li><a href='" + pagingUrl + "?page=" + (currentIndex + 1) + "'>" + "»" + "</a></li>";
    }
    jQuery("ul.pagination").html(ulHtml);
};
      
