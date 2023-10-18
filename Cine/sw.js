self.addEventListener('install', e=>{

    const imagenes = caches.open('CacheImagenes').then(cache=>{
      cache.add('/'),
        cache.add('../img/cine.jpg'),
        cache.add('../img/El exorcista.jpg'),
        cache.add('../img/Gran Turismo.jpg'),
        cache.add('../img/icono.png'),
        cache.add('../img/La Monja II.jpg'),
        cache.add('../img/Por Siempre Te Amaré.jpg'),
        cache.add('../img/Taylor.jpg')
    })
  
    const estilo = caches.open('CacheEstilo').then(cache=>{
      cache.add('/'),
        cache.add('style.css')
    })
  
    const recursos =  caches.open('CacheRecursos').then(cache=>{
      cache.add('/'),
          cache.add('index.html'),
          cache.add('app.js'),
          cache.add('sw.js')
          cache.add('manifest.json')
       
  })
  e.waitUntil(recursos, imagenes, estilo);
  })
  
  //self.addEventListener('fetch', e=>{
  //     const respuesta = caches.match(e.request)
  //     .then(res=>{
  // if (res) return res;
  // console.log('No existe el recurso de caché ->', e.request.url);
  // return fetch(e.request).then (newResp =>{
  //   caches.open(CacheImagenes)
  //   .then(cache=>{
  //     cache.put(e.request,newResp)
  //   });
  //   return newResp.clone();
  // });
  // });
  // e.respondWith(respuesta);
  self.addEventListener('fetch', e=>{
    ///Estrategia 0 only net
    //Estrategia 1 only cache
    //Estrategia 2 firts cache, then network
    //Estrategia 3 firts networks then cache
   //Estrategia 2
    // const respuesta = caches.match(e.request).then((res) =>{
    //  if(res) return res;
   
    //  ///no existe el archivi
    //  //tengo que ir a la web
    //  console.log("No existe", e.request.url);
   
    //  return fetch (e.request).then ((newResp)=>{
    //    caches.open(CACHE_NAME).then((cache) =>{
    //      cache.put(e.request,newResp);
    //    });
    //    return newResp.clone();
    //  })
   
    // })
   
   //Estrategia 3
   const  respuesta = fetch(e.request).then ((newResp) =>{
    caches.open("CacheImagenes, CacheEstilo, CacheRecursos").then((cache) =>{
      cache.put(e.request, newResp);
    });

    return newResp.clone();
   }).catch(err=>{
    return caches.match(e.request);
   })
   e.respondWith(respuesta);

});
        
          

       