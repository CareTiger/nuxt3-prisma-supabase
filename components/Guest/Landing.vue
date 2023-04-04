<template>
    <main class="">
        <div
            class="h-full w-full grid place-items-center my-content-height mx-auto text-center lg:text-left"
        >
            <div class="px-4 sm:px-8 lg:w-1/2 xl:pr-16">
                <h1
                    class="text-4xl font-bold tracking-tight text-gray-900 dark:text-slate-200 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl"
                >
                    <span class="block xl:inline">Proof</span>
                    <span class="block text-green-500 xl:inline"
                        >&nbsp;of concept</span
                    >
                </h1>
                <div
                    class="mx-auto mt-3 max-w-md text-lg text-gray-500 dark:text-slate-200 sm:text-xl md:mt-5 md:max-w-3xl"
                >
                    This project showcases
                    <ol>
                        <li>- Auth (signup & login), protected routes</li>
                        <li>
                            - User creating, reading, updating and deleting
                            their questions/notes
                        </li>
                        <li>- Attach media to question or comment</li>
                        <li>- Full Text Search</li>
                        <li>- Comment on other users question/note</li>
                        <li>- Look up the other users profiles</li>
                        <li>- Make your own profile private</li>
                        <li>- Secure your own private URL</li>
                        <li>- Update your default avatar</li>
                    </ol>
                </div>
                <div class="mt-10 sm:flex sm:justify-center lg:justify-start">
                    <transition
                        appear
                        @before-enter="beforeEnter"
                        @enter="enter"
                    >
                        <div class="rounded-md shadow">
                            <u-i-button-primary
                                class="w-full"
                                @click="gotoSignup"
                            >
                                Get started
                            </u-i-button-primary>
                        </div>
                    </transition>
                </div>
            </div>
        </div>
    </main>
</template>
<script setup>
import gsap from "gsap";

function beforeEnter(el) {
    console.log("before enter");
    el.style.transform = "translateY(-60px)";
    el.style.opacity = 0;
}

function enter(el) {
    console.log("enter");
    gsap.to(el, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "bounce.out",
    });
}

function gotoSignup() {
    navigateTo("/auth/signup");
}
</script>
