<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->notNullable();
            $table->string('phone', 255)->notNullable();
            $table->enum('status', ['FAILED', 'PENDING', 'PAID'])->notNullable()->default('PENDING');
            $table->double('price')->notNullable();
            $table->string('url', 255)->nullable();
            $table->string('payment_method', 255)->nullable();
            $table->string('payment_channel', 255)->nullable();
            $table->string('first_name', 255)->notNullable();
            $table->string('last_name', 255)->notNullable();
            $table->string('email', 255)->notNullable();
            $table->string('address_description', 255)->nullable();
            $table->string('address', 255)->notNullable();
            $table->string('city', 255)->notNullable();
            $table->string('postal_code', 255)->notNullable();
            $table->string('country', 255)->notNullable();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
