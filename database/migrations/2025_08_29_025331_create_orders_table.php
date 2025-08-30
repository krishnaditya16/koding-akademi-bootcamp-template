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
            $table->unsignedBigInteger('user_id');
            $table->string('address', 255);
            $table->string('phone', 255);
            $table->string('postal_code', 255);
            $table->enum('status', ['FAILED', 'PENDING', 'PAID'])->default('PENDING');
            $table->string('url', 255)->nullable();
            $table->decimal('total', 10, 2)->nullable();
            $table->string('payment_method', 255)->nullable();
            $table->string('payment_channel', 255)->nullable();
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
