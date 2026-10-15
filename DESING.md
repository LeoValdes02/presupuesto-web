# DESIGN.md

## 1. Dirección visual

La calculadora debe transmitir:

- claridad
- profesionalidad
- sencillez
- precisión
- confianza

El diseño debe dar prioridad a la información y al cálculo.

No buscamos una interfaz llamativa por decoración.

---

## 2. Referencia visual

Inspiración general:

Seline Analytics / interfaces SaaS de analítica limpias.

No se copiará su diseño.

Tomaremos únicamente principios como:

- fondo neutro claro
- superficies blancas
- bordes suaves
- poco uso de sombras
- un único color de acento
- bastante espacio entre bloques
- jerarquía tipográfica clara

---

## 3. Colores

La identidad cromática toma como referencia
erickarevalo.com, adaptada a nuestro sistema.

### Base oscura

Background:
#0E1626

Surface:
#1B2335

Texto principal:
#FFFFFF

Texto secundario:
#B8C0CF

Bordes:
#30394B

### Marca

Cyan:
#00C6E4

Indigo:
#433DF2

Violeta:
#9627F9

### Base clara

Background claro:
#ECF3FF

Texto oscuro:
#0E1626

### Gradiente principal

#00C6E4 → #433DF2 → #9627F9

Usar solo en elementos destacados:

- CTA principal
- títulos seleccionados
- estados activos especiales

No utilizarlo como decoración constante.

### Fondo principal

#F7F7F5

Uso:
fondo general de la web.

### Superficie

#FFFFFF

Uso:
formularios, tarjetas y resultados.

### Texto principal

#171717

Uso:
títulos, precios y contenido importante.

### Texto secundario

#6B6B67

Uso:
explicaciones y contenido secundario.

### Bordes

#E5E5E1

Uso:
tarjetas, inputs y separadores.

### Color principal

#2563EB

Uso:

- botones principales
- enlaces
- estados activos
- elementos interactivos

El color principal debe utilizarse con moderación.

---

## 4. Tipografía

Utilizar inicialmente:

Inter

Fallback:

system-ui,
sans-serif

Prioridades:

- alta legibilidad
- números claros
- títulos compactos
- textos secundarios discretos

---

## 5. Escala tipográfica aproximada

Texto pequeño:
14px

Texto normal:
16px

Subtítulos:
20-24px

Títulos de sección:
32-40px

Hero:
48-64px en escritorio

Los tamaños serán responsive.

---

## 6. Espaciado

Usar una escala coherente:

4px
8px
12px
16px
24px
32px
48px
64px
80px

Evitar valores arbitrarios como:

17px
29px
43px

salvo necesidad concreta.

---

## 7. Bordes

Inputs:
8-10px

Botones:
10px

Tarjetas:
14px

No utilizar botones completamente redondos como estilo general.

---

## 8. Sombras

Utilizar pocas sombras.

Prioridad:

1. diferencia de color
2. bordes
3. sombra suave solo cuando aporte profundidad

Evitar sombras fuertes.

---

## 9. Calculadora

En escritorio:

Formulario y estimación pueden aparecer en dos columnas.

Ejemplo:

| Configuración | Estimación |
| ------------- | ---------- |
| Países        | Precio     |
| Inversión     | Desglose   |
| Opciones      | Totales    |

En móvil:

una sola columna.

Primero configuración.

Después resultado.

---

## 10. Tarjetas de país

Cada país debe mostrarse como una unidad independiente.

Debe mostrar:

- nombre del país
- inversión
- honorario de gestión
- aviso si se aplica mínimo

La información económica debe ser fácil de escanear.

---

## 11. Resultado principal

El dato visualmente más importante será:

Primer mes

Después:

Total mensual

Después:

- inversión
- gestión
- puesta en marcha

Nunca depender únicamente del color para transmitir información.

---

## 12. Botones

### Principal

Fondo azul.

Texto blanco.

Uso:

- calcular
- solicitar propuesta
- acciones principales

### Secundario

Fondo transparente o blanco.

Borde visible.

Uso:

- añadir país
- acciones secundarias

### Peligro

Para eliminar elementos.

No debe competir visualmente con la acción principal.

---

## 13. Formularios

Los inputs deben tener:

- label visible
- borde claro
- buen contraste
- estado focus evidente
- tamaño cómodo en móvil

Nunca usar únicamente placeholder como label.

---

## 14. Responsive

Mobile first.

La interfaz debe funcionar desde aproximadamente:

320px

hasta escritorio grande.

Evitar anchos fijos.

Contenido principal:

max-width aproximado de 1200px.

---

## 15. Accesibilidad

Mantener:

- HTML semántico
- labels reales
- fieldset y legend
- navegación mediante teclado
- focus visible
- contraste suficiente
- aria-live para resultados dinámicos cuando sea necesario

---

## 16. Animaciones

Utilizar únicamente microinteracciones.

Por ejemplo:

- hover de botón
- aparición suave de resultados
- transición de borde/focus

Evitar:

- elementos moviéndose constantemente
- animaciones largas
- efectos decorativos innecesarios

---

## 17. Principio general

La interfaz debe parecer una herramienta profesional antes que una página decorativa.

Prioridad:

1. entender
2. calcular
3. comparar
4. actuar
5. decorar
