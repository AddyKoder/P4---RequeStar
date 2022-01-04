let q_next = 1
let h_next = 1

let queries = {}
let headers = {}

async function get_req(url){
    let resp = await fetch(url)
    console.log(resp.status, resp.statusText);
    if(resp.status === 200){
        let data = await resp.text();
        get('#response').innerText = data;
        localStorage['url'] = url;
    }
    else{
        get('#response').innerText = `Some Error Occured \n Error Code: ${resp.status} \n Error Message: ${resp.statusText}`;

    }
}

async function post_req(url, obj){
    let resp = await fetch(url, obj)
    console.log(resp.status, resp.statusText);
    if(resp.status === 200){
        let data = await resp.text();
        get('#response').innerText = data;
        localStorage['url'] = url;
    }
    else{
        get('#response').innerText = `Some Error Occured \n Error Code: ${resp.status} \n Error Message: ${resp.statusText}`;

    }
}



function get(selector) {
    return document.querySelector(selector)
}

function send_request() {
    let url = get('#address_bar').value.replace('localhost','http://127.0.0.1')+process_queries(queries)
    console.log(url);
    
    

    if(request_method.value == 'get'){
        post_req(url)}

    else{
        let obj = {
            method: 'POST',
            headers: process_headers(headers),
            body: get('#body_entry').value
        }
        post_req(url, obj)
    }
    
}

function process_queries(){
    let to_ret = ''
    for(let i in queries){
        if(queries[i] != undefined){
            to_ret += `${i}=${queries[i]}&`
        }
    }
    return '?'+to_ret.slice(0,-1)
}
function process_headers(){
    let to_ret = {}
    for(let i in headers){
        if(headers[i] != undefined){
            to_ret[i] = headers[i]
        }
    }
    return to_ret
}

function add_query_entry() {
    
    let qn = get('.query_name').value;
    let qv = get('.query_value').value;

    queries[`${qn}`] = qv;

    if(qn !=='' && qv !=='') {
        get('#query_list').innerHTML = get('#query_list').innerHTML +
    `
    <div class="query_listing" id="q_${q_next}">
                        <div class="query_name_listing">${qn}</div>
                        <div class="query_value_listing">${qv}</div>
                        <input type="button" class="del_query" id="dq_${q_next++}" value="">
                        
                        </div>
    `
    get('.query_name').value = '';
    get('.query_value').value = '';
    
    del_listeners();
    }

    

     
}

function add_header_entry() {
    
    let hn = get('.header_name').value;
    let hv = get('.header_value').value;

    headers[`${hn}`] = hv;


    if(hn !=='' && hv !=='') {

        get('#header_list').innerHTML = get('#header_list').innerHTML +
    `
    <div class="header_listing" id="h_${h_next}">
                        <div class="header_name_listing">${hn}</div>
                        <div class="header_value_listing">${hv}</div>
                        <input type="button" class="del_header" id="dh_${h_next++}" value="">
                        
                        </div>
    `
    get('.header_name').value = '';
    get('.header_value').value = '';
    del_listeners();
    
    }
    
    
}

function change_method() {

    if(get('#request_method').value=='get'){
        h_nav.style.display = 'none';
        b_nav.style.display = 'none'
        switch_tab('q')
    }
    else{
        h_nav.style.display = 'block';
        b_nav.style.display = 'block';
    }
        
}

function switch_tab(tab) {
    if(tab == 'q'){
        
        get('#q_nav').style.borderColor = 'rgb(255, 108, 55)';
        get('#b_nav').style.borderColor = 'white';
        get('#h_nav').style.borderColor = 'white';

        get('#queries').style.display = 'block';
        get('#headers').style.display = 'none';
        get('#body').style.display = 'none';

    }    

    else if(tab == 'b'){

        get('#b_nav').style.borderColor = 'rgb(255, 108, 55)';
        get('#q_nav').style.borderColor = 'white';
        get('#h_nav').style.borderColor = 'white';
        
        get('#body').style.display = 'block';
        get('#headers').style.display = 'none';
        get('#queries').style.display = 'none';

    }

    else if(tab == 'h'){

        get('#h_nav').style.borderColor = 'rgb(255, 108, 55)';
        get('#b_nav').style.borderColor = 'white';
        get('#q_nav').style.borderColor = 'white';

        get('#headers').style.display = 'block';
        get('#queries').style.display = 'none';
        get('#body').style.display = 'none';

    }
    
}

function del_listeners() {
    

    function ret_q(id) {
        
        return function() {
            get(`#q_${id}`).style.display = 'none';
            queries[get(`#q_${id} .query_name_listing`).innerText] = undefined;
        }
    }

    function ret_h(id) {
        return function() {
            get(`#h_${id}`).style.display = 'none';
            headers[get(`#h_${id} .header_name_listing`).innerText] = undefined;

        }
    }
    

    for(let i = 1; i<q_next; i++) {
        try {
            get(`#dq_${i}`).onclick = ret_q(i);

            
        } catch (error) {
            5            
        }
    }

    for(let i = 1; i<h_next; i++) {
        try {
            get(`#dh_${i}`).onclick = ret_h(i);
            
        } catch (error) {
            5
        }
    }

    
}

del_listeners()

// content-type: "application/json"

try {
    get('#address_bar').value = localStorage.getItem('url')
} catch (error) {
    5
}