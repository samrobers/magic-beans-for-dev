import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../lib/supabaseClient';

export const useDocsPages = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setError(null);
    const { data, error: fetchError } = await supabase
      .from('docs_pages')
      .select('id, title, category, content, sort_order, updated_at')
      .order('category', { ascending: true })
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true });

    if (fetchError) {
      setError(fetchError.message);
      setLoading(false);
      return;
    }
    setPages(data || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const createPage = async ({ title, category, content }) => {
    const { data, error: insertError } = await supabase
      .from('docs_pages')
      .insert({ title, category, content })
      .select('id')
      .single();
    if (insertError) throw insertError;
    await refresh();
    return data.id;
  };

  const updatePage = async (id, { title, category, content }) => {
    const { error: updateError } = await supabase
      .from('docs_pages')
      .update({ title, category, content })
      .eq('id', id);
    if (updateError) throw updateError;
    await refresh();
  };

  const deletePage = async (id) => {
    const { error: deleteError } = await supabase
      .from('docs_pages')
      .delete()
      .eq('id', id);
    if (deleteError) throw deleteError;
    await refresh();
  };

  return { pages, loading, error, refresh, createPage, updatePage, deletePage };
};
