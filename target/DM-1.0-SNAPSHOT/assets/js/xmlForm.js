let login_form = document.getElementById('xml-form');

login_form.addEventListener('submit', async (e) => {
    e.preventDefault();
    e.stopPropagation();

    document.getElementById("xml-form").style.whiteSpace = "nowrap";

    //Input from user
    let txt=document.getElementById('xml-text').value;
    console.log(txt);

    //send xml file to backend
    let response = await fetch('api/xmldata/processing', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            xml_txt:txt,
        })
    });

    //get unique elements from backend
    let uniqueEle = await response.json(); // read response body and parse as JSON
    console.log(uniqueEle);

    localStorage.setItem("len",uniqueEle.length);
    //Allow user to select masking techniques in div2
    let count = 0;
    for(let i=0;i<uniqueEle.length;i++)
    {
        let para = document.createElement("P");
        para.id = count.toString();
        para.innerText = uniqueEle[i];
        count++;
        document.getElementById("xml-form2").appendChild(para);

        let values = ["no masking","masking", "swapping", "pseudonomyzation"];

        let select = document.createElement("select");
        select.id = count.toString();
        count++;

        for (const val of values)
        {
            let option = document.createElement("option");
            option.value = val;
            option.text = val.charAt(0).toUpperCase() + val.slice(1);
            select.appendChild(option);
        }
        document.getElementById("xml-form2").appendChild(select);
    }
});

let form2 = document.getElementById("xml-form2");
form2.addEventListener('submit',async (e) => {
        e.preventDefault();
        e.stopPropagation();

        let len = localStorage.getItem("len");

        let specList = {};

        for (let i = 0; i < (2 * len); i++) {

            let id = i.toString();
            let a = document.getElementById(id).innerHTML;
            i++;
            id = i.toString();
            specList[a] = document.getElementById(id).value;
        }
        console.log(specList);

        let response = await fetch('api/xmldata/createspec', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                specs: specList
            })
        }).then(
            response => {
                if (response['status'] === 203) {

                } else {
                }
            }
        );
    }
);