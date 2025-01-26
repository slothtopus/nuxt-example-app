<template>
  <main class="h-full flex flex-col">
    <header class="flex-none p-4 border-b border-gray-300">
      <div class="w-full max-w-[--max-width] mx-auto">
        <slot name="header" />
      </div>
    </header>
    <section id="product-list" class="grow">
      <div class="w-full h-full max-w-[--max-width] mx-auto relative">
        <div
          id="product-scroller"
          class="absolute inset-0 overflow-auto p-4 pr-6"
        >
          <ul role="list" class="divide-y divide-gray-100">
            <slot name="default"></slot>
          </ul>
        </div>
      </div>
    </section>
    <footer class="flex-none border-t border-gray-300">
      <div class="w-full max-w-[--max-width] mx-auto relative">
        <slot name="footer"></slot>
      </div>
    </footer>
  </main>
</template>

<style scoped></style>
