const postsList = document.querySelector('.posts-list');

const postsLikedId = [];

const posts = [
    {
        id: 1,
        autore: {
            nome: 'Pablo Escobar',
            foto: 'https://picsum.photos/id/237/70/70'            
        },
        data: '06-25-2021',
        testo: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque ex vero libero debitis aperiam sed quaerat saepe sequi fugiat doloribus!',
        immagine: 'https://picsum.photos/id/238/600/450',
        likes: 80
    },
    {
        id: 2,
        autore: {
            nome: 'George Jung',
            foto: 'https://picsum.photos/id/239/70/70'         
        },
        data: '09-03-2021',
        testo: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque ex vero libero debitis aperiam sed quaerat saepe sequi fugiat doloribus!',
        immagine: 'https://picsum.photos/id/240/600/450',
        likes: 120
    },
    {
        id: 3,
        autore: {
            nome: 'Saul Goodman',
            foto: 'https://picsum.photos/id/241/70/70'           
        },
        data: '05-15-2021',
        testo: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque ex vero libero debitis aperiam sed quaerat saepe sequi fugiat doloribus!',
        immagine: 'https://picsum.photos/id/242/600/450',
        likes: 78
    },
    {
        id: 4,
        autore: {
            nome: 'Roberto Baggio',
            foto: 'https://picsum.photos/id/243/70/70'           
        },
        data: '08-01-2022',
        testo: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque ex vero libero debitis aperiam sed quaerat saepe sequi fugiat doloribus!',
        immagine: 'https://picsum.photos/id/244/600/450',
        likes: 56
    },
    {
        id: 5,
        autore: {
            nome: 'Kobe Bryant',
            foto: 'https://picsum.photos/id/247/70/70'           
        },
        data: '08-05-2022',
        testo: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque ex vero libero debitis aperiam sed quaerat saepe sequi fugiat doloribus!',
        immagine: 'https://picsum.photos/id/248/600/450',
        likes: 95
    },
]

posts.forEach(post => {
    const card = createPost(post);
    postsList.append(card);
});

// funzione che crea un post
function createPost({id, autore, data, testo, immagine, likes}) {
    const {nome, foto} = autore;
    const post = document.createElement('div');
    post.className = 'post';
    post.append(createPostHeader(nome, foto, data));
    post.append(createPostText(testo));
    const postImage = createPostImage(immagine);
    if ( postImage !== undefined )
        post.append(postImage);
    post.append(createFooter(id, likes));
    return post;
}

// funzione che crea un post header
function createPostHeader(nome, foto, data) {
    const header = document.createElement('div');
    header.className = 'post__header';
    header.append(createPostMeta(nome, foto, data));
    return header;
}

// funzione che crea un post-meta
function createPostMeta(nome, foto, data) {
    const postMeta = document.createElement('div');
    postMeta.className = 'post-meta';
    postMeta.append(createPostMetaIcon(nome, foto));
    postMeta.append(createPostMetaData(nome, data));
    return postMeta;
}

// funzione che crea post-meta__icon
function createPostMetaIcon(nome, foto) {
    const metaIcon = document.createElement('div');
    metaIcon.className = 'post-meta__icon';
    metaIcon.innerHTML = `<img class="profile-pic" src="${foto}" alt="${nome}">`;
    return metaIcon;
}

// funzione che crea post-meta__data
function createPostMetaData(nome, data) {
    const metaData = document.createElement('div');
    metaData.className = 'post-meta__data';
    const metaAuthor = document.createElement('div');
    metaAuthor.className = 'post-meta__author'
    metaAuthor.append(nome);
    const metaTime = document.createElement('div');
    metaTime.className = 'post-meta__time'
    metaTime.append(data);
    metaData.append(metaAuthor);
    metaData.append(metaTime);
    return metaData;
}

// funzione che crea post__text
function createPostText(testo) {
    const postText = document.createElement('div');
    postText.className = 'post__text';
    postText.append(testo);
    return postText;
}

// funzione che crea post__image
function createPostImage(immagine) {
    if ( immagine !== '' && immagine !== undefined ) {
        const postImage = document.createElement('div');
        postImage.className = 'post__image';
        postImage.innerHTML = `<img src="${immagine}" alt="">`;
        return postImage;
    }
    return;
}

// funzione che crea post__footer
function createFooter(id, likes) {
    const footer = document.createElement('div');
    footer.className = 'post__footer';
    const likesEl = document.createElement('div');
    likesEl.className = 'likes js-likes';
    likesEl.append(createLikesCta(id));
    likesEl.append(createLikesCounter(id, likes));
    footer.append(likesEl);
    return footer;
}

// funzione che crea likes__cta
function createLikesCta(postid) {
    const likesCta = document.createElement('div');
    likesCta.className = 'likes__cta';
    const link = document.createElement('a');
    link.className = 'like-button js-like-button';
    // link.href = '#';
    link.dataset.postid = `${postid}`;
    link.addEventListener('click', clickHandler);
    link.innerHTML = `<i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>`;
    link.innerHTML += `<span class="like-button__label">Mi Piace</span>`;
    likesCta.append(link);
    return likesCta;
}

// funzione che crea likes__counter
function createLikesCounter(postid, likes) {
    const likesCounter = document.createElement('div');
    likesCounter.className = 'likes__counter';
    likesCounter.innerHTML = `Piace a <b id="like-counter-${postid}" class="js-likes-counter">${likes}</b> persone`;
    return likesCounter;
}

// funzione che gestisce il click
function clickHandler() {
    const postId = parseInt(this.dataset.postid);
    this.classList.add('like-button--liked');
    posts.forEach(post => {
        if ( post.id === postId ) {
            postsLikedId.push(postId);
            post.likes++;
            // ottengo l'elemento 'likes' relative al pulsante premuto
            likesEl = this.parentElement.parentElement;
            const bEl = likesEl.querySelector('.js-likes-counter');
            bEl.innerHTML = post.likes;
            return
        }
    });
}