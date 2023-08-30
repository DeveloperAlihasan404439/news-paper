const newsCatagori = async()=>{
    const res = await fetch(' https://openapi.programming-hero.com/api/news/categories')
    const data = await res.json()
    const catagoris = data.data.news_category;
    newsCatagoriDisplay(catagoris);
}
// display in catagoris items name
const newsCatagoriDisplay = catagoris =>{
    const tabsContainer = document.getElementById('tabs-container')
    catagoris.forEach(catagori =>{
        const{category_id,category_name} = catagori;
        const newTab = document.createElement('div')
        newTab.innerHTML = `
            <a onclick="searchNewsIdDitails('${category_id}')" class="tab tab-lifted text-xl font-medium text-black">${category_name}</a>
        `
        tabsContainer.appendChild(newTab)
    })
}
// search daynamick id amd datails news
const searchNewsIdDitails = async(id ='01')=>{
    console.log(id);
    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
    const data = await res.json()
    const idNews = data.data;
    ditailsNewsId(idNews);
}
// display daynamick news in id
const ditailsNewsId = idNews =>{
    const displayIdNews = document.querySelector("#display-id-news")
    displayIdNews.innerText = ''
    idNews.forEach(news =>{
        const{thumbnail_url,title,details,author,_id,total_view} = news;
        const newId = document.createElement('div')
        newId.classList = 'card card-compact bg-base-100 shadow-xl';
        newId.innerHTML = `
        <img src="${thumbnail_url}" alt="Shoes" class='h-[350px]'/>
        <div class="card-body">
            <h2 class="text-xl font-medium text-black">${title.slice(0, 30)}</h2>
            <p class="text-md font-normal text-black pt-4 pb-1">${details.slice(0, 100)}</p>
            <p class="text-md font-normal text-black pb-4">Total View : ${total_view?total_view:'250'}</p>
            <div class="flex justify-between items-center">
                <div class="flex gap-3">
                    <div>
                        <img src="${author.img}" alt="Shoes" class='w-[60px] h-[50px] rounded-[50%]'/>
                    </div>
                    <div>
                        <h1 class="text-xl text-black">${author.name}</h1>
                        <p class = "text-md text-black">${author.published_date?author.published_date:"2022-08-24 11:53:13"}</p>
                    </div>
                </div>
                <button onclick ="onliNewsId('${_id}')" class="py-2 px-4 font-normal text-xl text-white bg-gradient-to-l from-[#38352d] via-[#1b160f] to-[#493f25] rounded-lg">Datails</button>
            </div>
        </div>
        `
        displayIdNews.appendChild(newId)
    })
}
//daynamick id and onli one datails news
const onliNewsId = id=>{
    fetch(`https://openapi.programming-hero.com/api/news/${id}`)
    .then(res => res.json())
    .then(data => displayOnliNewsId(data.data))
    my_display_modal.showModal()
}
const displayOnliNewsId = datas =>{
    const modelDisplay = document.getElementById('my_display_modal');
    modelDisplay.innerText = ''
    datas.forEach(data =>{
        console.log(data.image_url );
        const createModel = document.createElement('div')
        createModel.innerHTML =`
        <form method="dialog" class="modal-box">
        <img src="${data.image_url}" alt="Shoes" class='h-[350px]'/>
            <h2 class="text-xl font-medium text-black">${data.title.slice(0, 30)}</h2>
            <p class="text-md font-normal text-black pt-2 pb-1">${data.details.slice(0, 100)}</p>
            <p class="text-md font-normal text-black pb-1">Total View : ${data.total_view?data.total_view:'250'}</p>
            <div class="flex justify-between items-center">
                <div class="flex gap-3">
                    <div>
                        <img src="${data.author.img}" alt="Shoes" class='w-[60px] h-[50px] rounded-[50%]'/>
                    </div>
                    <div>
                        <h1 class="text-xl text-black">${data.author.name}</h1>
                        <p class = "text-md text-black">${data.author.published_date?data.author.published_date:"2022-08-24 11:53:13"}</p>
                    </div>
                </div>
            </div>
        <div class="modal-action w-full">
            <button class="py-2 w-[100%] font-normal text-xl text-white bg-gradient-to-l from-[#38352d] via-[#1b160f] to-[#493f25] rounded-lg">Close</button>
        </div>
        </form>
        `
        modelDisplay.appendChild(createModel)
    })
}
newsCatagori()
searchNewsIdDitails()