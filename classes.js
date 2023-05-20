class User {
    constructor(firstName, lastName, birthDate, email, sex, password, country, province, address, phone, newsLanguage, newsTopics) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.email = email;
        this.sex = sex;
        this.password = password;
        this.country = country;
        this.province = province;
        this.address = address;
        this.phone = phone;
        this.newsLanguage = newsLanguage;
        this.newsTopics = newsTopics;
    }      
}

class News {
    constructor(title, description, imageLink, author, publicationDate, linkArticle, topics) {
        this.title = title;
        this.description = description, 
        this.imageLink = imageLink; 
        this.author = author; 
        this.publicationDate = publicationDate; 
        this.linkArticle = linkArticle; 
        this.topics = topics
    }
}

export { User, News }