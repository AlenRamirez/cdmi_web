FROM php:8.2-apache

# Habilita mod_rewrite de Apache (necesario para Laravel)
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

# Instala Composer desde la imagen oficial
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Establece el directorio de trabajo del proyecto
WORKDIR /var/www/html

# Copia todos los archivos del proyecto al contenedor
COPY . .

# Instala dependencias de Laravel en producción
RUN composer install --no-dev --optimize-autoloader

# Establece permisos adecuados
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html/storage

# ✅ Cambia el DocumentRoot de Apache a la carpeta public/
ENV APACHE_DOCUMENT_ROOT /var/www/html/public

# Actualiza la configuración de Apache para usar el nuevo DocumentRoot
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/000-default.conf

# Asegura que Apache permita URLs amigables
RUN echo '<Directory /var/www/html/public>\n\
    Options Indexes FollowSymLinks\n\
    AllowOverride All\n\
    Require all granted\n\
</Directory>' > /etc/apache2/conf-available/laravel.conf && \
    a2enconf laravel

# Expone el puerto 80 (usado por Render)
EXPOSE 80
