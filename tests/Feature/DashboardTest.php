<?php

use App\Models\User;

test('guests are redirected to the login page', function () {
    $this->get(route('dashboard'))
        ->assertRedirect(route('login'));
});

test('authenticated admin users can visit the dashboard', function () {
    $user = User::factory()->create([
        'role' => 'ADMIN',
    ]);

    $this->actingAs($user, 'web');

    $this->get(route('dashboard'))->assertOk();
});
