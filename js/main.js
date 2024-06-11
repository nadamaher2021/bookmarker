

let siteName=document.getElementById('siteName');
let siteUrl=document.getElementById('siteUrl');
let siteContainer=[]
if(localStorage.getItem('all sites')!=null){
 siteContainer=JSON.parse(localStorage.getItem('all sites'))
  displaySite()
}
function addSite(){
   if(validation(siteName,'validName') && validation(siteUrl,'validUrl')){
    let sites={
      name:siteName.value,
      url:siteUrl.value,
     
     
      };
      siteContainer.push(sites);
      displaySite();
     
      localStorage.setItem('all sites',JSON.stringify(siteContainer))
     
      clearinputs()
      Swal.fire({
        
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500
      });
      
   }
   else{
    Swal.fire({
      title: 'Error!',
      text: 'Invalid data',
      icon: 'error',
      confirmButtonText: 'ok'
    })
   }

}
function displaySite(){
   let cartona="";
    for(let i=0;i<siteContainer.length;i++){
        cartona +=`
        <tr>
  <td>${i}</td>
  <td>${siteContainer[i].name}</td>
  <td><button class="btn btn-success" onclick="visitSite(${i})">Visit</button></td>
  <td><button class="btn btn-info" onclick="deleteSite()">delete</button></td>
</tr>
        `;
    }
    document.getElementById('tableContent').innerHTML=cartona;
}
function clearinputs(){
  siteName.value=""
  siteUrl.value=""
siteName.classList.remove('is-valid');
siteUrl.classList.remove('is-valid');
}
function deleteSite(index){
  siteContainer.splice(index,1),
  localStorage.setItem('all sites',JSON.stringify(siteContainer)),
  displaySite()
}
 function visitSite(index){
  window.open(siteContainer[index].url,"_blank")

 }
 function validation(element,validId){
  let valid=document.getElementById(validId);
  let regex={
    siteName:/^[A-Z][a-z]{3,8}$/,
    siteUrl:/^(https?|ftp):\/\/(([a-z\d]([a-z\d-]*[a-z\d])?\.)+[a-z]{2,}|localhost)(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i,
  };
  if(regex[element.id].test(element.value) == true){
 element.classList.add("is-valid");
 element.classList.remove("is-invalid");
 valid.classList.add("d-none");
 return true;
  }
  else{
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
 valid.classList.remove("d-none");
return false;
  }
 }
