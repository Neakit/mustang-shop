<template>
    <div>
        <modal v-show="blogModal"></modal>
        <button @click="createNewPost">new post</button>
    </div>
</template>

<script>
    import Modal from '../../components/admin/PostsEditorModal';
    import { mapGetters, mapMutations } from 'vuex';

    export default {
        components: {
            Modal
        },
        methods: {
            ...mapMutations('modals', ['toggleModal', 'setPost']),
            createNewPost() {
                // this.setPost({
                //     title: '',
                //     description: ''
                // });
                this.toggleModal({
                    name: 'blogModal',
                    bool: true
                });
            }
        },
        computed: {
            ...mapGetters('modals', ['blogModal'])
        }
    }
</script>
