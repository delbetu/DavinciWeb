const express = require('express');
const router = express.Router();
const Usuario = require('../models/user');
const Textos = require('../models/textos');
const Imagen = require('../models/image');
const Protfolio = require('../models/protfolio_img');
const fs = require('fs');
const httpStatus = require('http');
var path_head = "./src/public/images/head/foto_head.jpg";
var id_img = null;
var head_img = null;
const pre_path = "./src/public/images/head/";
const pre_path_port_gallery = "./src/public/images/portfolio/gallery/";
const pre_path_port = './src/public/images/portfolio/';
var message = null;
var error = null;

router.get('/',async(req,res,next)=>{
    new Textos();
    const txt = await Textos.find();
    console.log(txt[1].text);
    const img = await Imagen.find();
    const imgPort = await Protfolio.find();
    
    res.render('layout/main',{
        title:'DavinciRaleigh',
         titulo1: txt[0].text,
         titulo2: txt[1].text,
         about: txt[2].text,
         about2: txt[3].text,
         aboutDesc: txt[4].text,
         aboutItem1: txt[5].text,
         item1Desc: txt[6].text,
         aboutItem2: txt[7].text,
         item2Desc: txt[8].text,
         aboutItem3: txt[9].text,
         item3Desc: txt[10].text,
         aboutItem4: txt[11].text,
         item4Desc: txt[12].text,
         workstitulo: txt[13].text,
         workDesc: txt[14].text,
         serviceTitulo: txt[15].text,
         serviceSubtitulo: txt[16].text,
         serviceDesc: txt[17].text,
         serviceItem1tit: txt[18].text,
         serviceItem1Desc1: txt[19].text,
         serviceItem2tit: txt[20].text,
         serviceItem1Desc2: txt[21].text,
         serviceItem3tit: txt[22].text,
         serviceItem1Desc3: txt[23].text,
         serviceItem4tit: txt[24].text,
         serviceItem1Desc4: txt[25].text,
         serviceItem5tit: txt[26].text,
         serviceItem1Desc5: txt[27].text,
         serviceItem6tit: txt[28].text,
         serviceItem1Desc6: txt[29].text,
         contactTitulo: txt[30].text,
         contactSubtitulo: txt[31].text,
         contactMail: txt[32].text,
         contactTelefono: txt[33].text,
         contactTextAdress: txt[34].text,
         contactAdress1: txt[35].text,
         contactAdress2: txt[36].text,
         redesTitulo: txt[37].text,
         linkFace: txt[38].text,
         linkInsta: txt[39].text,
         linkYoutube: txt[40].text,
         status1: txt[41].text,
         statusCant1: txt[42].text,
         status2: txt[43].text,
         statusCant2: txt[44].text,
         status3: txt[45].text,
         statusCant3: txt[46].text,
         status4: txt[47].text,
         statusCant4: txt[48].text,
         head: img[0].title,
         img_port1_title:imgPort[0].title,
        img_port1_cat:imgPort[0].cat,
        img_port1_proj: imgPort[0].projLink,
        img_port1_desc: imgPort[0].description,
        // 2
        img_port2_title:imgPort[1].title,
        img_port2_cat:imgPort[1].cat,
        img_port2_proj: imgPort[1].projLink,
        img_port2_desc: imgPort[1].description,
        //3
        img_port3_title:imgPort[2].title,
        img_port3_cat:imgPort[2].cat,
        img_port3_proj: imgPort[2].projLink,
        img_port3_desc: imgPort[2].description,
        //4
        img_port4_title:imgPort[3].title,
        img_port4_cat:imgPort[3].cat,
        img_port4_proj: imgPort[3].projLink,
        img_port4_desc: imgPort[3].description,
        //5
        img_port5_title:imgPort[4].title,
        img_port5_cat:imgPort[4].cat,
        img_port5_proj: imgPort[4].projLink,
        img_port5_desc: imgPort[4].description,
        //6
        img_port6_title:imgPort[5].title,
        img_port6_cat:imgPort[5].cat,
        img_port6_proj: imgPort[5].projLink,
        img_port6_desc: imgPort[5].description
    });
    
});
router.post('/Actualizar',async(req,res)=>{
    console.log(req.body.text,req.body.code);
    new Textos();
    const txtt = await Textos.find({code:req.body.code});
    console.log((txtt[0]._id),req.body.text);
    
    
    await Textos.update({_id:(txtt[0]._id)},{$set:{text:req.body.text}});
    
    
    res.render('admin');
});
router.get('/login_admin',(req,res)=>{
    console.log('login  ',req.session.name);
    if(req.session.name=='Matias'){
        res.sendStatus(404);
    }
    else{
        res.render('login',{
            title:'Inicia sesión'
        });
    }
    
});
router.get('/admin',async (req,res)=>{
    var msj = '';
    if(message!=null){
        msj = message;
    }
    var _err = '';
    if(error!=null){
        _err = error;
    }
    message = null;
    error = null;
    console.log(req.session.name,'hh');
    if(req.session.name=='undefined'||req.session.name==''){
        res.sendStatus(404);
    }
    else if(req.session.name=='Matias'){
        new Imagen()
        const image = await Imagen.find();
        console.log(Imagen.title);
        if(image[0]!=null){
             head_img = image[0]._id+"."+image[0].extension;
             console.log(head_img);
             res.render('admin',{
                _message:msj,
                err: _err,
                head: head_img,
                
            });
        }
        
        else{
            res.render('admin');
        }
    }
    else{
        res.sendStatus(404);
    }
    
});
router.post('/admin',async(req,res,next)=>{
    const nam = req.body.user;
    const pas = req.body.pass;
    // console.log(nam," - ",pas);
    const admin = new Usuario({name:nam,password:pas,date:Date.now()});
    new Imagen();
    var img = Imagen.find();
    if(Imagen.title==null)img=null;
    await Usuario.find({name:nam},function(err,user){
        if(err ||admin.name ==''|| admin.password=='' || user[0] == null || user[0].name!=admin.name || user[0].password != admin.password ){
            
            res.redirect('login_admin');
        }
        else{
            
            req.session.name=user[0].name;
            res.redirect('admin');
                     
        }
    });
    next();
});
router.post('/upHead',async(req,res,next)=>{
    // if(new_path!=null){
    //     fs.unlinkSync(new_path);
    //     new Imagen();
    //     Imagen.remove({_id:id_img},function(err){
    //         if(err)console.log('no se pudo eliminar el registro anterior');
    //     });
    // }
    
    console.log(req.files.file.originalFilename);
    if(req.files.file.originalFilename==''){
        res.render('admin',{message:'No hay seleccionada ninguna foto'});
    }
    else{
        if(req.files.title==null) req.files.title='no tiene título';
        if(req.files.cat==null) req.files.cat='no tiene categoría';
        if(req.files.projLink==null) req.files.projLink='no tiene link';
        if(req.files.description==null) req.files.description='no tiene descripcion';
        
        var ext = req.files.file.name.split(".").pop();
        var data = {
            name: req.files.file.name,
            title: req.files.title,
            cat:req.files.cat,
            projLink:req.files.projLink,
            description:req.files.description,
            // route: "images/head/"+imagen._id+"."+ext,
            extension:ext,
            code: 1
        }
        console.log(req.files.file.path);
            
        fs.rename(req.files.file.path, path_head,(err)=>{
            if(err) throw err;
            console.log('Rename complete!');
        });
        var imagen = new Imagen(data);
        await Imagen.update({code: 1},{$set:{
            cat: data.cat, description: 'foto cambiada'+Date.now(), extension: data.extension }},function(err){
            if(!err){
                console.log('Actualizada correctamente');
               
                message = 'Foto subida correctamente';
                res.redirect('admin');
            
            }
            else{
                
                res.send(err);
            }
        });
    }
    
      
});

router.post('/upPort',async (req,res)=>{
    var ext = req.files.file.name.split(".").pop();
    var portafolio = {
        name: req.files.file.name,
        title: req.body.title,
        cat: req.body.cat,
        projLink: req.body.projLink,
        description: req.body.description,
        extension: ext,
        code: req.body.code
    }
    var p = new Protfolio(portafolio);
    var new_name = portafolio.name;
    const p_old = await Protfolio.find({code:p.code});
    console.log(p_old[0].name+' nombre');
    var nombre = p_old[0].name;
    var old_path1 = pre_path_port_gallery+'g-'+nombre;
    var old_path2 = pre_path_port+nombre;
    var old_path3 = old_path2.substr(0,old_path2.length-4)+'@2x.'+ext;
    
    fs.rename(req.files.file.path, old_path1,(err)=>{
        if(err) throw err;
        console.log('Rename complete!');
    });
    console.log(req.files.file2.originalFilename,' file2');
    if(req.files.file2.originalFilename ==''){
        fs.createReadStream(old_path1).pipe(fs.createWriteStream(old_path2));
        fs.createReadStream(old_path1).pipe(fs.createWriteStream(old_path3));
    }
    else{
        try{
            fs.rename(req.files.file2.path,old_path2,(err)=>{
                if(err) console.log('con errores');
                console.log('Rename complete!');
            });
        }
        catch{
            error = 'No se pudo subir la imagen, vuelve a intentarlo';
            res.redirect('admin');
        }
        try{
            // fs.rename(req.files.file2.path,old_path2,(err)=>{
            //     if(err) throw err;
            //     console.log('Rename complete!');
            // });
            fs.createReadStream(req.files.file2.path,old_path2).pipe(fs.createWriteStream(old_path2));
        }
        catch{
            // error = 'No se pudo subir la imagen, vuelve a intentarlo';
                    res.redirect('admin');
        }
         fs.createReadStream(old_path2).pipe(fs.createWriteStream(old_path3));
    }
    
    await Protfolio.update({code: p.code},{$set:{title:p.title,
    cat: p.cat, projLink: p.projLink, description: p.description, extension: p.extension }},function(err){
        if(err){
            console.log('no se pudo actualizar');

        }
        else{
            console.log('se pudo actualizar');
        }
    });
    
    
    res.redirect('admin');
});
router.post('/upService',async(req,res,next)=>{
    var msg = '';
    var path ='';
    if(req.body.code==1) _path = 'photobook.png';
    if(req.body.code==2) _path = 'banner.png';
    if(req.body.code==3) _path = 'sesion.png';
    if(req.body.code==4) _path = 'diseno-grafico.png';
    if(req.body.code==5) _path = 'tarjetas.png';
    if(req.body.code==6) _path = 'fotomontaje.png';

    await fs.rename(req.files.file.path,'./src/public/images/services/'+_path,(err)=>{
        if(err) console.log('con errores');
        console.log('Rename complete!');
        if(!err){
            msg = 'Foto cambiada';
        }
    });
    console.log(req.body.code);
    
    return res.redirect('admin');
});
router.post('/close',function(req,res,next){
    if(req.session.name!='Matias'){
        res.sendStatus(404);
    }
    else{
        console.log('Sesion cerrada');
        req.session.name = '';
        res.redirect('/');
    }
     next();
});
module.exports = router;