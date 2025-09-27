-- CreateEnum
CREATE TYPE "public"."Permission" AS ENUM ('view', 'edit', 'comment');

-- CreateEnum
CREATE TYPE "public"."AccessType" AS ENUM ('public', 'private');

-- CreateEnum
CREATE TYPE "public"."ShareStatus" AS ENUM ('pending', 'accepted', 'rejected');

-- CreateEnum
CREATE TYPE "public"."Priority" AS ENUM ('low', 'medium', 'high');

-- CreateEnum
CREATE TYPE "public"."NotificationType" AS ENUM ('task_shared', 'share_accepted', 'share_rejected', 'share_updated');

-- CreateTable
CREATE TABLE "public"."users" (
    "user_id" VARCHAR(191) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),
    "avatar_url" VARCHAR(255),
    "full_name" VARCHAR(100),
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "public"."tags" (
    "tag_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" VARCHAR(191) NOT NULL,
    "tag_name" VARCHAR(50) NOT NULL,
    "color" VARCHAR(7) DEFAULT '#f0b00f',
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("tag_id")
);

-- CreateTable
CREATE TABLE "public"."todo_tags" (
    "todo_id" UUID NOT NULL,
    "tag_id" UUID NOT NULL,

    CONSTRAINT "todo_tags_pkey" PRIMARY KEY ("todo_id","tag_id")
);

-- CreateTable
CREATE TABLE "public"."todos" (
    "todo_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" VARCHAR(191) NOT NULL,
    "title" VARCHAR(255),
    "content" TEXT,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "due_date" TIMESTAMPTZ(6),
    "is_public" BOOLEAN NOT NULL DEFAULT false,
    "shared_with" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "priority" "public"."Priority" NOT NULL DEFAULT 'medium',

    CONSTRAINT "todos_pkey" PRIMARY KEY ("todo_id")
);

-- CreateTable
CREATE TABLE "public"."shared_notes" (
    "shared_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "todo_id" UUID NOT NULL,
    "owner_id" VARCHAR(191) NOT NULL,
    "shared_to" VARCHAR(191),
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "expires_at" TIMESTAMPTZ(6),
    "accepted_at" TIMESTAMPTZ(6),
    "invitation_token" VARCHAR(100),
    "shared_email" VARCHAR(100),
    "access_type" "public"."AccessType" NOT NULL DEFAULT 'private',
    "permission" "public"."Permission" NOT NULL DEFAULT 'view',
    "status" "public"."ShareStatus" NOT NULL DEFAULT 'pending',

    CONSTRAINT "shared_notes_pkey" PRIMARY KEY ("shared_id")
);

-- CreateTable
CREATE TABLE "public"."notifications" (
    "notification_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" VARCHAR(191) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "message" TEXT,
    "data" JSONB,
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "public"."NotificationType" NOT NULL,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("notification_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tags_user_id_tag_name_key" ON "public"."tags"("user_id", "tag_name");

-- CreateIndex
CREATE INDEX "todos_user_id_deleted_at_idx" ON "public"."todos"("user_id", "deleted_at");

-- CreateIndex
CREATE INDEX "todos_user_id_completed_idx" ON "public"."todos"("user_id", "completed");

-- CreateIndex
CREATE INDEX "todos_is_public_idx" ON "public"."todos"("is_public");

-- CreateIndex
CREATE UNIQUE INDEX "shared_notes_invitation_token_key" ON "public"."shared_notes"("invitation_token");

-- CreateIndex
CREATE INDEX "shared_notes_todo_id_shared_to_idx" ON "public"."shared_notes"("todo_id", "shared_to");

-- CreateIndex
CREATE INDEX "shared_notes_owner_id_idx" ON "public"."shared_notes"("owner_id");

-- CreateIndex
CREATE INDEX "shared_notes_shared_to_idx" ON "public"."shared_notes"("shared_to");

-- CreateIndex
CREATE INDEX "shared_notes_shared_email_idx" ON "public"."shared_notes"("shared_email");

-- CreateIndex
CREATE INDEX "shared_notes_invitation_token_idx" ON "public"."shared_notes"("invitation_token");

-- CreateIndex
CREATE INDEX "shared_notes_access_type_idx" ON "public"."shared_notes"("access_type");

-- CreateIndex
CREATE INDEX "notifications_user_id_is_read_idx" ON "public"."notifications"("user_id", "is_read");

-- AddForeignKey
ALTER TABLE "public"."tags" ADD CONSTRAINT "tags_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."todo_tags" ADD CONSTRAINT "todo_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("tag_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."todo_tags" ADD CONSTRAINT "todo_tags_todo_id_fkey" FOREIGN KEY ("todo_id") REFERENCES "public"."todos"("todo_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."todos" ADD CONSTRAINT "todos_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."shared_notes" ADD CONSTRAINT "shared_notes_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."shared_notes" ADD CONSTRAINT "shared_notes_shared_to_fkey" FOREIGN KEY ("shared_to") REFERENCES "public"."users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."shared_notes" ADD CONSTRAINT "shared_notes_todo_id_fkey" FOREIGN KEY ("todo_id") REFERENCES "public"."todos"("todo_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."notifications" ADD CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
