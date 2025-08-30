<?php

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\Sanctum;

test('user can register via api', function () {
    $response = $this->postJson(route('api.register'), [
        'name' => 'Test User',
        'email' => 'newuser@example.com',
        'password' => 'password',
    ]);

    $response->assertStatus(200)
        ->assertJson([
            'message' => 'register user success',
            'error' => false,
        ])
        ->assertJsonStructure([
            'data' => ['id', 'name', 'email', 'created_at', 'updated_at'],
        ]);

    $this->assertDatabaseHas('users', [
        'email' => 'newuser@example.com',
    ]);
});

test('user can login via api', function () {
    $user = User::factory()->create([
        'email' => 'login@example.com',
        'password' => Hash::make('password'),
    ]);

    $response = $this->postJson(route('api.login'), [
        'email' => 'login@example.com',
        'password' => 'password',
    ]);

    $response->assertStatus(200)
        ->assertJson([
            'message' => 'Login successful',
            'error' => false,
        ])
        ->assertJsonStructure([
            'data' => ['id', 'name', 'email', 'created_at', 'updated_at'],
            'token',
        ]);
});

test('user cannot login with invalid credentials', function () {
    User::factory()->create([
        'email' => 'wrong@example.com',
        'password' => Hash::make('password'),
    ]);

    $response = $this->postJson(route('api.login'), [
        'email' => 'wrong@example.com',
        'password' => 'incorrect',
    ]);

    $response->assertStatus(401)
        ->assertJson([
            'data' => null,
            'message' => 'Invalid credentials',
            'error' => true,
        ]);
});

test('user can logout via api', function () {
    $user = User::factory()->create();

    Sanctum::actingAs($user);

    $response = $this->postJson(route('api.logout'));

    $response->assertStatus(200)
        ->assertJson([
            'message' => 'Logout successful',
            'error' => false,
        ]);
});

test('user can fetch profile via api', function () {
    $user = User::factory()->create();

    Sanctum::actingAs($user);

    $response = $this->getJson(route('api.profile'));

    $response->assertStatus(200)
        ->assertJson([
            'message' => 'Get profile success',
            'error' => false,
        ])
        ->assertJsonStructure([
            'data' => ['id', 'name', 'email', 'created_at', 'updated_at'],
        ]);
});
