# Usa la imagen oficial de PHP con Apache
FROM php:8.2-apache

# Habilita Apache mod_rewrite para Laravel
RUN a2enmod rewrite

# Instala dependencias del sistema
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    curl \
    git \
    default-mysql-client \
    libzip-dev \
    && docker-php-ext-install pdo_mysql mbstring zip exif pcntl

# Instala Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Establece el directorio de trabajo
WORKDIR /var/www/html

# Copia los archivos del proyecto Laravel (esto se reemplaza al usar bind mount)
COPY . /var/www/html

# Da permisos a la carpeta de almacenamiento y caché de Laravel
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html/storage

# Configura el virtual host para permitir Laravel routes
RUN echo '<Directory /var/www/html>\n\
    Options Indexes FollowSymLinks\n\
    AllowOverride All\n\
    Require all granted\n\
</Directory>' > /etc/apache2/conf-available/laravel.conf && \
    a2enconf laravel

# Expone el puerto 80
EXPOSE 80
