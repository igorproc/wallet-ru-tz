<template>
  <v-form @submit.prevent="onCreateTask" class="mb-6">
    <v-text-field
      ref="textField"
      v-model="taskTitle"
      label="Новая задача"
      :rules="[value => !!value || 'Введите текст задачи']"
      variant="outlined"
      density="comfortable"
    />

    <v-btn type="submit" color="primary" class="mt-2">Добавить</v-btn>
  </v-form>
</template>

<script setup lang="ts">
import { useTemplateRef } from 'vue'

interface Emits {
  (name: 'task:create', task: string): void
}

const emit = defineEmits<Emits>()

const $textField = useTemplateRef<{ reset?: () => void } | null>('textField')
const taskTitle = defineModel<string>('task-title', { default: '' })

const resetTextField = () => {
  if (!$textField.value?.reset) {
    return
  }

  $textField.value.reset()
}

const onCreateTask = () => {
  if (!taskTitle.value) {
    return
  }

  emit('task:create', taskTitle.value)
  resetTextField()
}
</script>
