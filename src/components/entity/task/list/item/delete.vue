<template>
  <div v-if="deletionTimer?.timeLeft" class="deletion-pending">
    <v-chip color="error" size="small" class="mr-2">
      Удаление через {{ deletionTimer.timeLeft }}
    </v-chip>

    <v-btn
      @click="onToggle"
      variant="text"
      color="warning"
      size="small"
    >
      Отмена
    </v-btn>
  </div>

  <v-btn
    v-else
    icon
    @click="onToggle"
    variant="text"
    color="error"
    size="small"
  >
    <v-icon>mdi-delete</v-icon>
  </v-btn>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { ITask } from '@/shared/types/task.ts'

interface DeletionTimer {
  timerId: number
  timeLeft: number
}

interface Props {
  id: ITask['id']
}

interface Emits {
  (name: 'delete', id: ITask['id']): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const deletionTimer = ref<DeletionTimer | null>(null)

const onToggle = () => {
  if (deletionTimer.value) {
    cancelDeletion()
    return
  }

  startDeletion()
}

const startDeletion = () => {
  if (deletionTimer.value) {
    return
  }

  const timerId = window.setInterval(() => {
    if (!deletionTimer.value) {
      return
    }

    deletionTimer.value.timeLeft--

    if (deletionTimer.value.timeLeft <= 0) {
      emit('delete', props.id)

      if (deletionTimer.value.timerId) {
        clearInterval(deletionTimer.value.timerId)
        deletionTimer.value = null
      }
    }
  }, 1000)

  deletionTimer.value = { timerId, timeLeft: 10 }
}

const cancelDeletion = () => {
  if (!deletionTimer.value?.timerId) {
    return
  }

  clearInterval(deletionTimer.value.timerId)
  deletionTimer.value = null
}
</script>

<style scoped>
.deletion-pending {
  display: flex;
  align-items: center;
}
</style>
