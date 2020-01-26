<template>
  <div>
    <h2>Список пользователей</h2>

    <user-list
      title="Пользователей в базе"
      :url="url">
      <tr slot="header">
        <th>#</th>
        <th>Имя</th>
        <th>Фамилия</th>
        <th>Активен</th>
        <th>Баланс</th>
        <th>Email</th>
        <th>Телефон</th>
        <th>Зарегистрирован</th>
      </tr>
      <template
        slot="row"
        slot-scope="props">
        <td>
          <router-link :to="`/edit/${props.id}`"># {{ props.id }}</router-link>
        </td>
        <td>{{ props.firstName }}</td>
        <td>{{ props.lastName }}</td>
        <td>{{ props.isActive }}</td>
        <td>{{ props.balance }}</td>
        <td>{{ props.email }}</td>
        <td>{{ props.phone }}</td>
        <td>{{ props.registered }}</td>
      </template>
    </user-list>

  </div>
</template>

<script>
export default {
  name: 'UsersPage',
  components: {
    'user-list': () => import('@/components/UserList.vue')
  },
  data: () => ({
    // URL загрузки списка пользователей
    url: 'http://localhost:3004/users/'
  })
}
</script>
